const themeOptions = require('@availity/gatsby-theme-docs/theme-options');

module.exports = {
  pathPrefix: '/docs/sdk',
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Availity SDK',
        description:
          'Documentation for Availity Javascript SDK, Rest API and GraphQL',
        githubRepo: 'availity/gatsby-theme-availity',
        contentDir: 'packages/site/source',
        sidebarCategories: {
          null: ['index'],
          'API Resources': [
            'api-axios/api-axios',
            'api-core/api-core',
            'localstorage-core/localstorage-core',
          ],
          Upload: ['upload-core/upload-core'],
          Analytics: ['analytics/analytics-core'],
        },
      },
    },
  ],
};
