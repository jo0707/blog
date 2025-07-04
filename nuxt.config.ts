import { seoData } from "./data";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-30",

  modules: [
    "nuxt-icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@formkit/auto-animate",
    "@stefanobartoletti/nuxt-social-share",
    "@nuxt/ui",
  ],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      charset: "utf-16",
      viewport: "width=device-width,initial-scale=1",
      title: seoData.title,
      titleTemplate: `%s - ${seoData.title}`,
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  sitemap: {
    sources: [seoData.mySite],
  },

  site: {
    url: seoData.mySite,
    name: "Joshua Palti Sinaga",
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/rss.xml"],
    },
  },

  ogImage: {
    zeroRuntime: true,
    defaults: {
      cacheMaxAgeSeconds: 60,
    },
  },

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "light",
  },

  content: {
    experimental: { nativeSqlite: true },
    preview: {
      api: "https://api.nuxt.studio",
    },
    build: {
      markdown: {
        highlight: {
          theme: "tokyo-night",
        },
      },
    },
  },
});
