# Gatsby Theme Availity

> Shared theme for generating Availity Open Source Documentation

### Configurations

`gatsby-config`

```js
module.exports = {
  pathPrefix: '/sdk-js', // https://www.gatsbyjs.org/docs/path-prefix/
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-availity',
      options: {
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

| Option name       | Type   | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| root              | string | Must be `__dirname`                                                |
| subtitle          | string | The title that gets rendered above the sidebar navigation          |
| description       | string | The site description for SEO and social (FB, Twitter) tags         |
| contentDir        | string | The directory where docs content exists (`docs/source` by default) |
| githubRepo        | string | The owner and name of the content repository on GitHub             |
| sidebarCategories | object | An object mapping categories to page paths ([described below][])   |

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

## Creating pages

This theme generates pages based on Markdown or MDX files in the [`contentDir`](#configuration) directory of a repo. Your Markdown/MDX files should contain some frontmatter defining their titles and descriptions.

```markdown
---
title: Introduction
description: What is Apollo Server and what does it do?
---

Apollo Server is the best way to quickly build a production-ready, self-documenting API for GraphQL clients, using data from any source.
```

Page URLs will be derived from the file paths of your Markdown. You can nest Markdown files within directories to create pages with additional path segments.

## Deployment

All docs sites will eventually be deployed into a subdirectory, as configured by the `pathPrefix` option&mdash;/docs/apollo-server, for example. [Read this guide](../../#deploying-to-a-subdirectory) to learn more about publishing to a subdirectory.
