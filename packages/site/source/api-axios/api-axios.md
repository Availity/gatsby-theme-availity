---
title: Axios
summary: A package wrapping @av/api-core with axios and native ES6 Promise.
---

[![Version](https://img.shields.io/npm/v/@availity/api-axios.svg?style=for-the-badge)](https://www.npmjs.com/package/@availity/api-axios)

## Install

```bash
npm install @availity/api-axios @availity/api-core @availity/localstorage-core --save
```

Polyfill `Promise` if needed:

```bash
npm install es6-promise --save
```

## Usage

```js
import { userApi } from '@availity/api-axios'

function async getUser() {
    const user = await userApi.me();
}
```

## API Definitions

- `AvMicroserviceApi`
- `AvProxyApi`
- `avWebQLApi`
- `avLogMessagesApi`
- `avNavigationApi`
- `avNotificationApi`
- `avOrganizationsApi`
- `avPermissionsApi`
- `avProvidersApi`
- `avRegionsApi`
- `avPdfApi`
- `avSpacesApi`
- `avUserApi`
- `avUserPermissionsApi`
- `avFilesApi`
- `avFilesDeliveryApi`
- `avSettingsApi`
- `avSlotMachineApi`
- `avDisclaimersApi`
- `avCodesApi`

Details about each api can be found [here](../api-core/api-core)

```js
// complete example
import AvApi, {
    AvMicroserviceApi,
    AvProxyApi,
    avWebQLApi,
    avLogMessagesApi,
    avNavigationApi,
    avNotificationApi,
    avOrganizationsApi,
    avPermissionsApi,
    avProvidersApi,
    avRegionsApi,
    avPdfApi,
    avSpacesApi,
    avUserApi,
    avUserPermissionsApi,
    avFilesApi,
    avFilesDeliveryApi,
    avSettingsApi,
    avSlotMachineApi,
    avDisclaimersApi
    avCodesApi,
} from '@availity/api-axios';
```

## Create API Definitions

Create new API definitions by extending `AvApi`. Extending `AvApi` provides services the behaviors described in [api-core](../api-core/api-core#features)

```js
import AvApi from '@availity/api-axios';
class AvExampleResource extends AvApi {
  constructor() {
    super({
      name: 'exampleApi',
    });
  }
}
export default new AvExampleResource();
```

## Create Proxy API Definitions

Create new API definitions by extending `AvApiProxy`. Extending `AvApiProxy` provides services the behaviors described in [api-core](../api-core/api-core#features) as well as building the url to match your tenant's proxy REST conventions.

```js
import { AvApiProxy } from '@availity/api-axios';
class AvExampleResource extends AvApiProxy {
  constructor() {
    super({
      tenant: 'myhealthplan',
      name: 'patients',
    });
  }
}
export default new AvExampleResource();
```
