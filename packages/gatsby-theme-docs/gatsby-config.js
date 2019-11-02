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
      title: 'Availity Docs',
      subtitle,
      description,
    },
    plugins: [
      {
        resolve: `gatsby-plugin-compile-es6-packages`,
        options: {
          modules: [
            '@availity/breadcrumbs',
            '@availity/feedback',
            '@availity/typography',
            '@availity/form',
            '@availity/select',
            '@availity/icon',
            '@availity/app-icon',
            '@availity/spaces',
            '@availity/page-header',
            '@availity/api-core',
            '@availity/api-axios',
            '@availity/localstorage-core',
            '@availity/resolve-url',
          ],
        },
      },
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
        resolve: 'gatsby-plugin-mdx',
        options: {
          gatsbyRemarkPlugins,
        },
      },
    ],
  };

  return config;
};
