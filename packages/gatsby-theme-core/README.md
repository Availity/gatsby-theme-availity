# Gatsby Theme Core

> Package containing base components and plugins for Availity Themed Gatsby Sites

## Gatsby Plugins Included

- [gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/)
- [gatsby-plugin-sas](https://www.gatsbyjs.org/packages/gatsby-plugin-sass/)

## Components Included

- [TopNavigation](./src/components/TopNav/index.js)
- [Layout](./src/components/layout.js)

### TopNavigation

Contains Top Navigation Component rendered at the top of the page

#### Props

| Prop Name | type   | required | description                                              |
| --------- | ------ | -------- | -------------------------------------------------------- |
| navItems  | array  | `true`   | List of nav items to render at the top right of the page |
| pathname  | string | `true`   | Current pathname of the page                             |

`navItems` object structure:

```json
{
  "value": "/availity-react",
  "text": "Components"
}
```

#### Usage

```jsx
import { TopNavigation } from '@availity/gatsby-theme-core';

// render
<TopNavigation
 navItems=[{
  value: "/availity-react",
  text: "Components"
}]
  pathname="/availity-react/components/app-icon"
/>
```

### Layout

The base layout that should be the first thing on each page. Will contain all the proper site metadata and formatting for height adjustments

#### Props

N/A

#### Usage

```jsx
import { Layout } from '@availity/gatsby-theme-core';

// render
<Layout>
  <TopNavigation />
  <PageContent />
</Layout>;
```
