import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import cssInjectedByJSPlugin from "vite-plugin-css-injected-by-js";

const gitVersion = execSync("git rev-parse --short HEAD").toString().trim();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJSPlugin({ topExecutionPriority: false })],
  define: {
    "import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN_CLIENT": `"${process.env.ROLLBAR_ACCESS_TOKEN_CLIENT ?? ""}"`,
    "import.meta.env.VITE_GIT_VERSION": `"${gitVersion}"`,
  },
  base: "./",
  build: {
    sourcemap: "hidden",
    manifest: "manifest.json",
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
      preserveEntrySignatures: "strict",
      // input: './src/main.tsx',
    },
  },
});
