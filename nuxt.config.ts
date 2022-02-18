import {defineNuxtConfig} from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: ["~/assets/css/styles.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {}
                }
            },
        },
    },
    privateRuntimeConfig: {
        TMDB_API_URL: process.env.TMDB_API_URL,
        TMDB_TOKEN: process.env.TMDB_TOKEN,
    }
})
