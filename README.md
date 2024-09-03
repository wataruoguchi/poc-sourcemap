# PoC - Validate Sourcemaps

## Plans

| Plan | Description |
| --- | --- |
| 1 | Verify Sourcemaps in the browser |
| 2 | Validate Sourcemaps with a script |

### Plan 1: Verify Sourcemaps in the browser

1. Build the project
2. Run `npx http-server ./dist`
3. Open the localhost URL and go to the "Sources" tab in DevTools. You should see the original source code.

### Plan 2: Validate Sourcemaps with a script

1. Run `npx source-map-explorer dist/assets/*.js`
2. Check that the sourcemap is valid.

## Attempts

### Attempt 1

When everything is bundled in a single file, the sourcemap is valid (Plan 1 & 2 work).

### Attempt 2

When the code is split into chunks, the sourcemap is valid (Plan 1 & 2 work).

### Attempt 3

When the code is split into chunks, and it has a manifest.json,

### Attempt 4

When the code is split into chunks, it has a manifest.json, and the input file is specified,
