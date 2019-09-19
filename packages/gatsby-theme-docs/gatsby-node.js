const { createFilePath } = require(`gatsby-source-filesystem`);

const configPaths = [
  'docs/gatsby-config.js', // new gatsby config
  'docs/_config.yml', // old hexo config
];

// generates the top nav links
function generateNavItems(baseUrl, config) {
  return Object.entries(config).map(([value, { text, matchRegex }]) => ({
    text,
    value: value.startsWith('/') ? baseUrl + value : value,
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

// Will return a formatted last of all the categories for the left side nav
function getSidebarContents(sidebarCategories, edges) {
  return Object.keys(sidebarCategories).map(key => ({
    title: key === 'null' ? null : key,
    pages: sidebarCategories[key]
      .map(linkPath => {
        const match = linkPath.match(
          /^\[([\w\s\d]+)\]\((https?:\/\/[\w.]+)\)$/
        );
        if (match) {
          return {
            anchor: true,
            title: match[1],
            path: match[2],
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
        };
      })
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
  } = options;

  const { edges } = data.allFile;

  const sidebarContents = getSidebarContents(sidebarCategories, edges);

  const [baseSite, owner, repo] = gitRepo.split('/');
  const template = require.resolve('./src/index.js');

  edges.forEach(edge => {
    const { id, title, relativePath } = edge.node;
    const { fields } = getPageFromEdge(edge);

    let url;

    if (baseSite.includes('github')) {
      url = `https://${baseSite}/${owner}/${repo}/tree/master/${contentDir}/${relativePath}`;
    } else if (baseSite.includes('code.availity')) {
      url = `https://${baseSite}/${owner}/${repo}/blob/master/${relativePath}`;
    } else if (baseSite.includes('git.availity')) {
      url = `https://${baseSite}/${owner}/${repo}/repos/browse/${relativePath}`;
    }

    createPage({
      path: fields.slug,
      component: template,
      context: {
        id,
        title,
        sidebarContents,
        gitUrl: url,
        baseUrl,
        navItems: generateNavItems(baseUrl, navConfig),
      },
    });
  });
};
