const themeOptions = require('@availity/gatsby-theme-docs/theme-options');

module.exports = {
  proxy: {
    prefix:'/api',
    url:'http://localhost:5050'
  },
  pathPrefix: '/gatsby-theme-availity',
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
          null: ['index', 'form'],
          Components:['components/date'],
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
  plugins: [
    {
      // For compling `availity-react` modules
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: ['@availity/form','@availity/select','@availity/date','@availity/yup','@availity/icon','xhr-mock'],
      },
    },
  ],
};
