const themeOptions = require('@availity/gatsby-theme/theme-options');

module.exports = {
  pathPrefix: '/docs/sdk',
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-availity',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Availity SDK',
        description:
          'Documentation for Availity Javascript SDK, Rest API and GraphQL',
        githubRepo: 'availity/sdk-js',
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
