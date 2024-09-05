#!/usr/bin/env node

import "zx/globals";
import { openAsBlob } from "node:fs";

const hostName = process.env.APP_HOST;
const accessToken = process.env.ROLLBAR_ACCESS_TOKEN_SERVER;
const gitVersion = process.env.GIT_VERSION;

if (!hostName || !accessToken || !gitVersion) {
  console.error("Missing environment variables");
  process.exit(1);
}

// URL to your minified file without schema
const minifiedUrlHost = hostName.replace(/https?:/, "");

// Look up against gh-pages branch
const jsFiles = (await $`find assets -name "*.js"`.text())
  .split("\n")
  .filter((file) => file.length > 0);

await Promise.all(jsFiles.map(uploadSourcemap));

/**
 * Uploads a sourcemap to Rollbar
 * @param {string} jsFile - The path to the JavaScript file (local)
 */
async function uploadSourcemap(jsFile) {
  const blob = await openAsBlob(`${jsFile}.map`);
  const form = new FormData();
  form.append("access_token", accessToken);
  form.append("version", gitVersion);
  form.append("minified_url", `${minifiedUrlHost}${jsFile}`);
  form.append("source_map", blob);

  await fetch("https://api.rollbar.com/api/1/sourcemap", {
    method: "POST",
    body: form,
  })
    .then((response) => response.json())
    .then((data) => console.log("Sourcemap uploaded successfully:", data))
    .catch((error) => console.error("Error uploading sourcemap:", error));
}
