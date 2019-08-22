---
title: Analytics Core
summary: Analytics core logic and auto-tracking.
---

[![Version](https://img.shields.io/npm/v/@availity/analytics-core.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/analytics-core)

A package providing a base Analytics class to track events and page views

## Install

`npm install @availity/analytics-core`

## Configuration

`AvAnalytics` requires Plugins and a Promise lib.

```javascript
new AvAnalytics(plugins, promise);
```

`AvAnalytics` also has an optional 3rd parameter, a boolean to determine if pageTracking is enabled.
For page tracking to be used, `startPageTracking` and `stopPageTracking` functions must be defined to create listeners and call `trackPageView`.
`AvAnalytics` also has an optional 4th parameter, "autoTrack", a boolean which default to `true`.
When `true`, "autoTrack" will be enabled which will automatically log

```javascript
new AvAnalytics(plugins, promise, pageTracking, autoTrack, options);
```

### Options

- **attributePrefix** string. Overrides the default prefix for getting attributes.
- **recursive** boolean. If `true`, will add on all attributes from the clicke/focused node up to the root element. It requires one attribute to have contain `action`.

Example using the `recursive` option ( Will add all 3 attributes when the `anchor` tag is clicked. If the container is clicked nothing will happen ):

```html
<div class="container" data-analytics-app-name="app">
  <a href="#" data-analytics-action="click" data-analytics-event-name="linking"
    >Click me!</a
  >
</div>
```

## Plugins

Plugins can be one or an array of objects/classes:

A default class with functions defined and enabled logic is provided `AvAnalyticsPlugin`.

```javascript
import { AvAnalyticsPlugin } from '@availity/analytics-core';
```

### Plugin Methods

the functions/properties used by `AvAnalytics` are:

#### isEnabled

Determines if this plugin will be called at various points.
If this is a function, the return value will be used. Otherwise will be checked as boolean.

#### init

if defined, will be called when `AvAnalytics` is initialized.

#### trackEvent

if defined, called when `AvAnalytics` receives a trackEvent call.

#### trackPageView

if defined, called when `AvAnalytics` receives a trackPageView call.

### Defined Plugins

#### AvSplunkAnalytics

`AvSplunkAnalytics` is a plugin to track events with the `AvLogMessages` api.
It defaults the url and level before sending.

```javascript
import { AvSplunkAnalytics } from '@availity/analytics-core';

const exampleSplunkAnalytics = new AvSplunkAnalytics(
  new AvLogMessages({ http, promise, merge }),
  isEnabled
);
```

## Methods

### `init()`

Initialize analytics pageTracking and plugins

### `setPageTracking(value)`

use parameter to set turn page tracking on/off. Always checks that pageTracking has been set up or torn down as needed.

### `trackEvent(properties)`

Send properties to each plugins `trackEvent` function.

### `trackPageView(url)`

Send url or `location.href` to each plugins `trackEvent` function.

## AutoTrack Logged events

With "autoTrack" enabled (enabled by default) you can add special `data-analytics-*` to any element which will be rendered to the DOM.
For native form elements (input, select, and textarea) with the special attribute, `focus` and `blur` events will trigger analytics to be logged.
For all other element with the special attribute, `click` events will trigger analytics to be logged.
You can have as many of the `data-analytics-*` attributes on an element as you which, all of the properties will be logged with the `data-analytics-` prefix removed and the remaining camelcased as the key and the value of the attribute as the logged value.
This works with all libraries such as angular, react, jquery, and pure HTML.

```jsx
<a
  href="/some-place-cool"
  data-analytics-variation="b"
  data-analytics-organization-id={orgId}
  data-analytics-page-num={currentPage}
>
  Go there now!
</a>
```

```jsx
import { Input } from 'reactstrap';
//...
<Input data-analytics-variation="b" data-analytics-organization-id={orgId} />;
```

## Authors

**Kasey Powers**

- [kaseyepowers@gmail.com](kaseyepowers@gmail.com)

## License

[MIT](../../LICENSE)
