// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Beeep",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@formkit/nuxt", "@pinia/nuxt"],
  css: ["vue-cal/dist/vuecal.css"],
});
