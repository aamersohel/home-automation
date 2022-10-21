// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/scss/style.scss"],
  plugins: ["@/plugins/bootstrap.client"],
  build: {
    loaders: {
      scss: {
        implementation: require("sass"),
      },
    },
  },
  modules: ["@pinia/nuxt"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "sass:color"; @import "@/assets/scss/variables.scss";',
        },
      },
    },
  },
});
