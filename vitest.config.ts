import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    root: ".",
    setupFiles: ["./tests/test/setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "src/presentation"),
      "@/core": path.resolve(__dirname, "src/core"),
      "@/infra": path.resolve(__dirname, "src/infra"),
      "@/application": path.resolve(__dirname, "src/application"),
      "@/lib": path.resolve(__dirname, "src/presentation/lib"),
      "@/components": path.resolve(__dirname, "src/presentation/components"),
      "@/ui": path.resolve(__dirname, "src/presentation/components/ui"),
      "@/content": path.resolve(__dirname, "src/infra/adapters/i18n/content"),
      "@/messages": path.resolve(__dirname, "src/presentation/messages"),
    },
  },
})
