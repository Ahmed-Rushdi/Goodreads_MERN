import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

// https://vitejs.dev/config/
config({ path: "./env" });

export default defineConfig({
  plugins: [react()],
});
