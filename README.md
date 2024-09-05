# PoC - Validate Sourcemaps

This repository is to investigate how Rollbar handles sourcemaps.

## Problem 1

We attempted to upload a sourcemap to Rollbar with the [Upload Option 2](https://docs.rollbar.com/docs/source-maps#3-upload-your-source-map-files). However, Rollbar did not detect the sourcemap.

The resource had the sourcemap URL:

```js
//# sourceMappingURL=bundle.js.map
```

The resource is delivered via `https://example.com/assets/bundle.js` and the sourcemap is located in the same directory: `https://example.com/assets/bundle.js.map`.

Loading the sourcemap file directly worked as expected.

## Solution for Problem 1

The [Upload Option 1](https://docs.rollbar.com/docs/source-maps#3-upload-your-source-map-files) with specifying the remote URL to `minified_url` worked. Specifying the local file path did not work.

## Problem 2

Rollbar reported the following error:

> Possible source map configuration error: line and column number combination not found in source map

### Investigation

This is because we used `vite-plugin-css-injected-by-js` to inject CSS into the DOM. This plugin updates the resource file after the sourcemap is generated.

## Solution for Problem 2

Setting the option `{ topExecutionPriority: false }` to the plugin prevented the issue.

## Notes

The technical support from Rollbar suggested making sure that the sourcemap is valid with [Source Map Validator](https://sourcemaps.io/). The validator displays errors even when we set the resource path that has a valid (working with Rollbar) sourcemap.

As a second option, we validated the sourcemap with the following command:

```sh
npx source-map-explore dist/assets/*.js
```
