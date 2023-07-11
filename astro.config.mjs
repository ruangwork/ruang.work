import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroI18next({
      baseLanguage: "en",
      i18next: {
        debug: true, // convenient during development to check for missing keys
        supportedLngs: ["en"],
      },
    }),
  ],
});
