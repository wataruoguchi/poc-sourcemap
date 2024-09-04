import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
