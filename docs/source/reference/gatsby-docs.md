---
title: Gatsby Theme Docs
---

This API Reference documents all the available configurations for `gatsby-config.js`.

```bash
npX install-peerdeps @availity/gatsby-theme-docs
```

## Default Theme Options

We include an export for the default theme options in the case you don't want to explicity put them there yourself.

<br />

You can simply import the file and spread its contents onto the theme options before overwriting with your own if you are unsure what all you have missed.

`theme-options.js`

```js
const navConfig = {
  '/availity-workflow': {
    text: 'Getting Started',
    matchRegex: '^/availity-workflow',
  },
  '/availity-uikit': {
    text: 'UI Kit',
    matchRegex: '^/availity-uikit',
  },
  '/availity-react': {
    text: 'Components',
    matchRegex: '^/availity-react',
  },
  '/sdk-js': {
    text: 'Resources',
    matchRegex: '^/sdk-js',
  },
};

module.exports = {
  siteName: 'Availity Docs',
  baseUrl: 'https://availity.github.io',
  navConfig,
};
```

## Theme Configs

| Option name       | Type   | Description                                                                            |
| ----------------- | ------ | -------------------------------------------------------------------------------------- |
| root              | string | Must be `__dirname`                                                                    |
| subtitle          | string | The title that gets rendered above the sidebar navigation                              |
| description       | string | The site description for SEO and social (FB, Twitter) tags                             |
| contentDir        | string | The directory where docs content exists (`docs/source` by default)                     |
| gitType           | string | The repository manager: Github, Bitbucket, or Gitlab                                   |
| gitRepo           | string | The owner and name of the content repository on Github, Bitbucket, or Gitlab           |
| sidebarCategories | object | An object mapping categories to page paths ([described below][])                       |
| navConfig         | object | An object containing all the navigation items rendered at the top right of the top nav |

### `sidebarCategories`

The `sidebarCategories` option is an object keyed by category titles. Each entry in the object is an array of page paths. The path should resemble the location of a Markdown/MDX file in the git repository, relative to `contentDir`, and without the `.md` extension. Sidebar navigation items that are not a member of a category live under the `null` key.

```js hideCopy=true
{
  null: [
    'index',
    'getting-started',
    'whats-new'
  ],
  Features: [
    'features/mocking',
    'features/errors',
    'features/data-sources'
  ]
}
```

If you want to have secondary categories like [Gatsby Them Core](/reference/gatsby-core/) then you can make your category an object like the below.

```js hideCopy=true
{
  'API Reference': [{
    resolve: 'reference/gatsby-core/index', // The secondary page introd
    pages: [ // the list of pages underneath
      'reference/gatsby-core/components','reference/gatsby-core/reference'
    ]
  }, 'reference/gatsby-docs'],
}
```

### `navConfig`

The `navConfig` option is an object keyed by the title of the nav items to be rendered at the top right of the screen in the navigation.

```js hideCopy=true
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
