import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@service": path.resolve(__dirname, "./src/service"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@upload": path.resolve(__dirname, "./upload"),
    },
  },
  plugins: [react()],
});
