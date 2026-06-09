import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // write-excel-file/browser is loaded via a dynamic import() (lazy, admin-only
  // export). Pre-bundle it so Vite doesn't re-optimize mid-session and break the
  // in-flight dynamic import ("Failed to fetch dynamically imported module").
  optimizeDeps: {
    include: ["write-excel-file/browser"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
});
