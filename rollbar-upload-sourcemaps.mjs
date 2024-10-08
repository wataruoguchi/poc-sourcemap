#!/usr/bin/env node

import { openAsBlob } from "node:fs";
import { execSync } from "node:child_process";

const hostName = process.env.APP_HOST;
const accessToken = process.env.ROLLBAR_ACCESS_TOKEN_SERVER;
const gitVersion = process.env.GIT_VERSION;

if (!hostName || !accessToken || !gitVersion) {
  console.error("Missing environment variables");
  process.exit(1);
}

const isDry = !(process.argv[2] && process.argv[2] == "--non-dry");

// URL to your minified file without schema
const minifiedUrlHost = hostName.replace(/https?:/, "");

// Look up against gh-pages branch when gitVersion isn't "0"
const jsFiles = execSync(
  `find ${gitVersion === "0" ? "dist/assets" : "assets"} -name "*.js"`,
)
  .toString()
  .split("\n")
  .filter((file) => file.length > 0);

await Promise.all(jsFiles.map(uploadSourcemap));

/**
 * Uploads a sourcemap to Rollbar
 * @param {string} jsFile - The path to the JavaScript file (local)
 */
async function uploadSourcemap(jsFile) {
  const blob = await openAsBlob(`${jsFile}.map`);
  const minifiedUrl = `${minifiedUrlHost}${jsFile}`;
  const form = new FormData();
  form.append("access_token", accessToken);
  form.append("version", gitVersion);
  form.append("minified_url", minifiedUrl);
  form.append("source_map", blob);

  if (isDry) {
    console.log("Dry run: would upload sourcemap for", jsFile, {
      gitVersion,
      minifiedUrl,
    });
    return;
  }

  await fetch("https://api.rollbar.com/api/1/sourcemap", {
    method: "POST",
    body: form,
  })
    .then((response) => response.json())
    .then((data) => console.log("Sourcemap uploaded successfully:", data))
    .catch((error) => console.error("Error uploading sourcemap:", error));
}
