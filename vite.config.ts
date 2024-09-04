import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import { defineConfig } from "vite";

const gitVersion = execSync("git rev-parse --short HEAD").toString().trim();

// TODO: This should be given in CI/CD pipelines
process.env.ROLLBAR_ACCESS_TOKEN_CLIENT = "98873bd1b40b4226aece2bd8df8843b9";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN_CLIENT": `"${process.env.ROLLBAR_ACCESS_TOKEN_CLIENT ?? ""}"`,
    "import.meta.env.VITE_GIT_VERSION": `"${gitVersion}"`,
  },
  build: {
    sourcemap: true,
    // manifest: "manifest.json",
    // rollupOptions: {
    //   output: {
    //     manualChunks: (id: string) => {
    //       if (id.includes('node_modules')) {
    //         return 'vendor'
    //       }
    //     }
    //   },
    //   preserveEntrySignatures: 'strict',
    //   input: './src/main.tsx',
    // },
  },
});
