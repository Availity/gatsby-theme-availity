module.exports = ({
  root,
  subtitle,
  description = 'Documentation for Availity Javascript SDK, Rest API and GraphQL',
  checkLinksOptions,
}) => {
  const gatsbyRemarkPlugins = [
    'gatsby-remark-autolink-headers',
    {
      resolve: 'gatsby-remark-copy-linked-files',
      options: {
        ignoreFileExtensions: [],
      },
    },
    'gatsby-remark-rewrite-relative-links',
    {
      resolve: 'gatsby-remark-check-links',
      options: checkLinksOptions,
    },
  ];

  const config = {
    siteMetadata: {
      title: 'Avality Docs',
      subtitle,
      description,
    },
    plugins: [
      {
        resolve: '@availity/gatsby-theme-core',
        options: {
          root,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${root}/source`,
          name: 'docs',
        },
      },
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: gatsbyRemarkPlugins,
        },
      },
      'gatsby-plugin-sass',
      {
        extensions: ['.mdx', '.md'],
        resolve: 'gatsby-plugin-mdx',
        options: {
          gatsbyRemarkPlugins,
        },
      },
    ],
  };

  return config;
};
