import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects',
          dest: ''
        }
      ]
    })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
