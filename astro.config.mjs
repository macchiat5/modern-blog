import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
// import api from "./src/lib/api";

export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: "server",
  // adapter: node({
  //   middleware: [api.fetch],
  // }),
});
