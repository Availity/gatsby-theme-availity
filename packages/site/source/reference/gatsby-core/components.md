---
title: Gatsby Them Core Components
---

There are a few exported components that are used for building themes.

### TopNavigation

Component running the top navigation of the page, including the search bar and the right nav items.

#### Props

| Prop Name        | Type               | Description                                                                          |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------ |
| **`brandAttrs`** | Object             | Any Props related to the Logo                                                        |
| **`navItems`**   | Array of `NavItem` | Contains all the navigation items to render at the top right.                        |
| **`pathname`**   | String             | Current path of the page. Can be passed in from the `location.pathname` from Gatsby. |

`navItems` structure:

```json
[
    {
        "text": "Availity React",
        // If matchRegex is passed in it will match the current path to the regex,
        // otherwise it will match to the current value passed in to the navitem.
        "value": "https://avaiility.github.io/availity-react",
        "matchRegex": /\d
    }
]
```

### Layout

Contains the base layout that should be rendered as the first element on your page.

## Usage

To use this plugin in your theme, you will have to add it to the list of plugins in your `gatsby-config.js`.

### Register Plugin

```js
module.exports = {
  // ...
  plugins: [
    {
      resolve: '@availity/gatsby-theme-core',
      options: {
        root: __dirname,
      },
    },
  ],
};
```

### Using The Components

```jsx
import { Layout, TopNavigation } from '@availity/gatsby-theme-core';

<Layout>
  <TopNavigation />
  {/* Page Content */}
</Layout>;
```
