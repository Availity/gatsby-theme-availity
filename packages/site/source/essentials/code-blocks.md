---
title: Modifiying Codeblocks
---

The codeblocks rendered in the markdown are using custom code blocks with some custom configurations.

## Adding Attributes

When beginning to write a codeblock, you first start with the "\`\``". After specifying the language you can input custom attributes starting immediately afterwords.

<br />

The below code block will not have a copy button because we passed `hideCopy` to the codeblock

```json hideCopy=true
// Test Hiding copy
```

````markdown header=hideCopy.md
```json hideCopy=true
// Test Hiding copy
`\``
```
````

## Live Preview

You can enable the live preview by setting the `live` attribute to `true` for the codeblock. By default, your components being rendered will not be resolved because live preview doesn't babelify the `imports` you have in the codeblock. Instead it is provided via `scopes`. By default we include the whole `reactstrap` library so you can get started seeing what its like to write code blocks with reactstrap.

### Reactstrap Live

```jsx live=true
<Container className="d-flex flex-column justify-content-center align-items-center">
  <div className="lead">Check me Out!</div>
  <Button color="primary">Click Me</Button>
</Container>
```

### Custom Components

In order to live preview your own components you will be taking advantage of [Component Shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/). Please read the article for information on what this is before continuing.

<br />

We will be overriding the `LiveCodeScopes.js` component located at:  
`@availity/gatsby-theme-docs/src/components/LiveCodeScopes.js`.

This means your overrides folder structure will look like:

```something hideCopy=true
your-docs-site
└── src
    └── @availity
        └── gatsby-theme-docs
            └── components
                └── LiveCodeScopes.js
```

You will need to export all of the components you want the `react-live` provider to be passed in the scopes.

#### Example

```jsx header=LiveCodeScopes.js
import AppIcon from '@availity/app-icon';
import * as Reactstrap from 'reactstrap';

const scopes = {
  ...Reactstrap,
  AppIcon,
};

export default AppIcon;
```

Now render your code block below with `live=true`.

```jsx live=true
import AppIcon from '@availity/app-icon';

<div className="w-100 d-flex flex-row justify-content-around align-items-center">
  <AppIcon title="Payer Space" color="blue" branded size="xl">
    PS
  </AppIcon>
  <AppIcon title="Payer Space" color="red" size="xl">
    PS
  </AppIcon>
  <AppIcon title="Payer Space" color="orange">
    PS
  </AppIcon>
</div>;
```

<br />

Note that we ignore compiling the `import` statement so that at minimum the reader can see how the import works.

<br />

## Configurations

| Attribute name | Type    | Description                                                              |
| -------------- | ------- | ------------------------------------------------------------------------ |
| live           | boolean | Whether or not to run the snippet in live preview mode.                  |
| hideCopy       | boolean | If true, will hide the `copy` button.                                    |
| header         | string  | Header text to go alongside the code block. Only works with code blocks. |
