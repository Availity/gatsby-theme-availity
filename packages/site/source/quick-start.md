---
title: Quick Start
summary: Getting started
---

## Steps

Follow the below steps for kickstarting your add.

### Create Folder Structure

```folder
/my-package/
|-- source
|   |-- index.md
|   |-- getting-started.md
| -- package.json
| -- gatsby-config.js
```

### Install dependencies

This will install `react`, `react-dom`, `gatsby`, `reactstrap` and our theme.

```bash
npx install-peerdeps @availity/gatsby-theme-docs
```

### Add scripts to your project

Your `package.json` should mirror the below when you are finished.

```json
{
  "private": true,
  "name": "site",
  "version": "2.1.9",
  "license": "MIT",
  "scripts": {
    "build": "gatsby build",
    "build:deploy": "gatsby build --prefix-paths",
    "develop": "gatsby develop",
    "clean": "gatsby clean"
  },
  "dependencies": {
    "@availity/gatsby-theme-docs": "^1.2.6",
    "gatsby": "^2.13.83",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "reactstrap": "^8.0.1"
  }
}
```

### Configure Gatsby Config (`gatsby-config.js`)

```js
// default theme options
const themeOptions = require('@availity/gatsby-theme-docs/theme-options');

module.exports = {
  __experimentalThemes: [
    {
      resolve: '@availity/gatsby-theme-docs',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'My Docs Site',
        description: 'Documentation for This Repo',
        githubRepo: '<user>/<repo-name>',
        sidebarCategories: {
          null: ['index', 'quick-start'],
        },
      },
    },
  ],
};
```

### Add markdown to `index.md`

```test
---
title: Introduction
summary: This is my first Gatsby Docs Site
---

This is only a test
```

### Add markdown to `getting-started.mdx`

```mdx
---
title: Getting Started
summary: Look I can write React in here
---

import { Button } from 'reactstrap';

<Button color="primary">Click Me</Button>
```

### Start Your App

```bash
npm run develop
```
