/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: ["en", "id"],
  showDefaultLocale: true,
  namespaces: ["home", "about", "snippets", "blog", "common"],
  defaultNamespace: "common",
};
