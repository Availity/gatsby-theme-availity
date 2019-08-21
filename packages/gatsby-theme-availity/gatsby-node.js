const { createFilePath } = require(`gatsby-source-filesystem`);
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

function getPageFromEdge({ node }) {
  return node.childMarkdownRemark || node.childMdx;
}

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

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    {
      allFile(filter: { extension: { in: ["md"] } }) {
        edges {
          node {
            id
            relativePath
            childMarkdownRemark {
              internal {
                type
              }
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `);

  const { contentDir = 'docs/source', githubRepo, sidebarCategories } = options;

  const { edges } = data.allFile;

  const sidebarContents = getSidebarContents(sidebarCategories, edges);

  const [owner, repo] = githubRepo.split('/');
  const template = require.resolve('./src/index.js');

  edges.forEach(edge => {
    const { id, title, relativePath } = edge.node;
    const { fields } = getPageFromEdge(edge);

    createPage({
      path: fields.slug,
      component: template,
      context: {
        id,
        title,
        sidebarContents,
        githubUrl: `https://github.com/${owner}/${repo}/tree/master/${contentDir}/${relativePath}`,
      },
    });
  });
};
