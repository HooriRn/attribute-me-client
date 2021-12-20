const isServerlessEnvironment = process.env.ON_VERCEL=="true";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: 'Attribute BETA | Performance Marketing Tool',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' }
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js",
        type: "text/javascript"
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/handsontable.full.min.css',
    '@/assets/styles/main.scss',
    '@/assets/styles/attribute-style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-handsontable', ssr: false },
    { src: '~/plugins/vue-md-date-range-picker', ssr: false },
    { src: '~/plugins/vue-mj-daterangepicker', ssr: false }
  ],

  env: {
    BASE_URL: process.env.BASE_URL,
    MS_URL: process.env.MS_URL || 'http://localhost:3000/api'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/device',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    ['@nuxtjs/dotenv'],
    '@nuxtjs/axios'
  ],

  serverMiddleware: isServerlessEnvironment ? [] : [
    '~/api/rest.js'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['handsontable']
  }
}
