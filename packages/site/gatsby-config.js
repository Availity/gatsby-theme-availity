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
        gitRepo: 'github.com/availity/gatsby-theme-availity',
        gitType: 'github',
        contentDir: 'packages/site/source',
        sidebarCategories: {
          null: ['index', 'quick-start'],
          Essentials: [
            'essentials/react',
            'essentials/mock',
            'essentials/relative-links',
            'essentials/code-blocks',
          ],
          'reference/index': [
            {
              resolve: 'reference/gatsby-core/index',
              pages: [
                'reference/gatsby-core/components',
                'reference/gatsby-core/reference',
              ],
            },
            'reference/gatsby-docs',
          ],
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
          '@availity/message-core',
          '@availity/favorites',
          '@availity/date',
          '@availity/yup',
          'xhr-mock',
        ],
      },
    },
  ],
};
