# Gatsby Theme Docs

> Shared theme for generating Availity Open Source Documentation

### Configurations

`gatsby-config`

```js
// Default themeOptions
const themeOptions = require("@availity/gatsby-theme-docs/theme-options');

module.exports = {
  pathPrefix: '/sdk-js', // https://www.gatsbyjs.org/docs/path-prefix/
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Availity SDK',
        description:
          'Documentation for Availity Javascript SDK, Rest API and GraphQL',
        githubRepo: 'availity/sdk-js',
        sidebarCategories: {
          'Getting Started': ['index'],
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
```

| Option name       | Type   | Description                                                                            |
| ----------------- | ------ | -------------------------------------------------------------------------------------- |
| root              | string | Must be `__dirname`                                                                    |
| subtitle          | string | The title that gets rendered above the sidebar navigation                              |
| description       | string | The site description for SEO and social (FB, Twitter) tags                             |
| contentDir        | string | The directory where docs content exists (`docs/source` by default)                     |
| githubRepo        | string | The owner and name of the content repository on GitHub                                 |
| sidebarCategories | object | An object mapping categories to page paths ([described below][])                       |
| navConfig         | object | An object containing all the navigation items rendered at the top right of the top nav |

### `sidebarCategories`

The `sidebarCategories` option is an object keyed by category titles. Each entry in the object is an array of page paths. The path should resemble the location of a Markdown/MDX file in the git repository, relative to `contentDir`, and without the _.md_ extension. To add an external link to your sidebar, your can provide a string formatted like a Markdown link.

```js
{
  'Getting Started': [
    'index',
    'getting-started',
    'whats-new'
  ],
  Features: [
    'features/mocking',
    'features/errors',
    'features/data-sources'
  ],
  'External links': [
    '[Principled GraphQL](https://principledgraphql.com/)'
  ]
}
```

### `navConfig`

The `navConfig` option is an object keyed by the title of the nav items to be rendered at the top right of the screen in the navigation.

````js
{
    '/availity-workflow': {
        text: 'Getting Started',
        matchRegex: '^/availity-workflow',
  },
  '/availity-uikit': {
        text: 'UI Kit',
        matchRegex: '^/availity-uikit',
  },
}
```

## Creating pages

This theme generates pages based on Markdown or MDX files in the [`contentDir`](#configuration) directory of a repo. Your Markdown/MDX files should contain some frontmatter defining their titles and descriptions.

```markdown
---
title: Introduction
summary: This is the summary of the introduction.
---

This is some sample markdown that we have below the metadata fields of the markdown file.
````

Page URLs will be derived from the file paths of your Markdown. You can nest Markdown files within directories to create pages with additional path segments.

## Deployment

All docs sites will eventually be deployed into a subdirectory, as configured by the `pathPrefix` option&mdash;/availity-react, for example. [Read this guide](../../#deploying-to-a-subdirectory) to learn more about publishing to a subdirectory.
