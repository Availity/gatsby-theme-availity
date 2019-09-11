const themeOptions = require('@availity/gatsby-theme-docs/theme-options');

module.exports = {
  proxy: {
    prefix: '/api',
    url: 'http://localhost:5050',
  },
  pathPrefix: '/gatsby-theme-availity',
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Gatsby Theme',
        description:
          'Documentation for Availity Javascript SDK, Rest API and GraphQL',
        githubRepo: 'availity/gatsby-theme-availity',
        contentDir: 'packages/site/source',
        sidebarCategories: {
          null: ['index', 'quick-start'],
          'Doc Essentials': [
            'essentials/react',
            'essentials/mock',
            'essentials/relative-links',
            'essentials/code-blocks',
          ],
          'API Reference': ['reference/gatsby-core', 'reference/gatsby-docs'],
        },
      },
    },
  ],
  plugins: [
    {
      // For compling `availity-react` modules
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [
          '@availity/breadcrumbs',
          '@availity/feedback',
          '@availity/typography',
          '@availity/form',
          '@availity/message-core',
          '@availity/favorites',
          '@availity/select',
          '@availity/date',
          '@availity/yup',
          '@availity/icon',
          '@availity/app-icon',
          '@availity/spaces',
          '@availity/page-header',
          'xhr-mock',
        ],
      },
    },
  ],
};
