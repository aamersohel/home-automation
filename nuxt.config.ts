// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/scss/style.scss"],
  plugins: ["~/plugins/bootstrap.client"],
  build: {
    loaders: {
      scss: {
        implementation: require("sass"),
      },
    },
  },
});
