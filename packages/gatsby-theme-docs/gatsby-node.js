/* eslint-disable prefer-destructuring */
const { createFilePath } = require(`gatsby-source-filesystem`);

const configPaths = [
  'docs/gatsby-config.js', // new gatsby config
  'docs/_config.yml', // old hexo config
];

// Borrowed from https://github.com/sindresorhus/is-absolute-url
const isAbsoluteUrl = url => {
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
  }

  return /^[a-z][a-z\d+.-]*:/.test(url);
};

// generates the top nav links
function generateNavItems(baseUrl, config) {
  return Object.entries(config).map(([value, { text, matchRegex }]) => ({
    text,
    value,
    matchRegex,
  }));
}

exports.onCreateNode = async ({ node, getNode, actions, loadNodeContent }) => {
  // If one of the nodes is part of the config paths that we specified we want it in the node list
  if (configPaths.includes(node.relativePath)) {
    const value = await loadNodeContent(node);
    actions.createNodeField({
      name: 'raw',
      node,
      value,
    });
  }

  // Create the slug for the filepath to the content if its one of the supported types
  if (['MarkdownRemark', 'Mdx'].includes(node.internal.type)) {
    const slug = createFilePath({
      node,
      getNode,
    });

    actions.createNodeField({
      name: 'slug',
      node,
      value: slug,
    });
  }
};

// Helper function to get the page content from the given edge.
function getPageFromEdge({ node }) {
  return node.childMarkdownRemark || node.childMdx;
}

function mapLinkToItem(linkPathOrObject, edges, depth, parent) {
  let linkPath = linkPathOrObject;
  let isRelative;
  let withPrefix = false;
  if (typeof linkPathOrObject === 'object') {
    linkPath = linkPathOrObject.resolve;
    // Allow for overwriting the default behavior if the link is in a sub folder but not a gatsby source file
    // e.g. /storybook
    isRelative = linkPathOrObject.isRelative;
    withPrefix = linkPathOrObject.withPrefix;
  }

  const match = linkPath.match(
    /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/
  );

  if (match) {
    return {
      anchor: true,
      isRelative:
        isRelative !== undefined ? isRelative : !isAbsoluteUrl(match[2]),
      withPrefix,
      title: match[1],
      path: match[2],
      parent,
      depth,
    };
  }

  const edge = edges.find(edge => {
    const { relativePath } = edge.node;
    return (
      relativePath
        .slice(0, relativePath.lastIndexOf('.'))
        .replace(/^docs\/source\//, '') === linkPath
    );
  });

  if (!edge) {
    return null;
  }

  const { frontmatter, fields } = getPageFromEdge(edge);
  return {
    title: frontmatter.title,
    path: fields.slug,
    parent,
    depth,
    pages:
      typeof linkPathOrObject === 'object' &&
      linkPathOrObject.pages.map(subLinkPath =>
        mapLinkToItem(subLinkPath, edges, depth + 1, {
          title: frontmatter.title,
          path: fields.slug,
        })
      ),
  };
}

const mapKeyToContent = (key, edges) => {
  const obj = {
    title: key === 'null' ? null : key,
    depth: 0,
  };

  const mappedItem = mapLinkToItem(key, edges, 0);

  if (mappedItem !== null) {
    return mappedItem;
  }

  return obj;
};

// Will return a formatted last of all the categories for the left side nav
function getSidebarContents(sidebarCategories, edges) {
  return Object.keys(sidebarCategories).map(key => ({
    ...mapKeyToContent(key, edges),
    pages: sidebarCategories[key]
      .map(linkPathOrObject => mapLinkToItem(linkPathOrObject, edges, 1))
      .filter(Boolean),
  }));
}

const pageFragment = `
  internal {
    type
  }
  frontmatter {
    title
    summary
  }
  fields {
    slug
  }
`;

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;
  const { data } = await graphql(`
  {
    allFile(filter: {extension: {in: ["md", "mdx"]}}) {
      edges {
        node {
          id
          relativePath
          childMarkdownRemark {
            ${pageFragment}
          }
          childMdx {
            ${pageFragment}
          }
        }
      }
    }
  }
  `);

  const {
    contentDir = 'docs/source',
    gitRepo,
    sidebarCategories,
    navConfig,
    baseUrl,
    gitType,
  } = options;

  const { edges } = data.allFile;

  const sidebarContents = getSidebarContents(sidebarCategories, edges);

  const [baseSite, owner, repo] = gitRepo.split('/');
  const template = require.resolve('./src/index.js');

  edges.forEach(edge => {
    const { id, title, relativePath } = edge.node;
    const { fields } = getPageFromEdge(edge);

    let url;

    if (gitType === 'github') {
      url = `https://${baseSite}/${owner}/${repo}/tree/master/${contentDir}/${relativePath}`;
    } else if (gitType === 'gitlab') {
      url = `https://${baseSite}/${owner}/${repo}/blob/master/${relativePath}`;
    } else if (gitType === 'bitbucket') {
      url = `https://${baseSite}/${owner}/${repo}/repos/browse/${relativePath}`;
    }

    createPage({
      path: fields.slug,
      component: template,
      context: {
        id,
        title,
        sidebarContents,
        gitType,
        gitUrl: url,
        baseUrl,
        navItems: generateNavItems(baseUrl, navConfig),
      },
    });
  });
};

// https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
// PageHeader => Spaces => react-loading-skeleton => emotion => window
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-loading-skeleton/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
