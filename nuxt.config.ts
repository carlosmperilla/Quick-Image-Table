// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true, // Para la configuración de las paginas.
    modules: ['@sidebase/nuxt-pdf'],
    css: [
      '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    app: {
        head: {
            title: 'QuickImageTable - Generador rapido de tablas con imagenes',
            htmlAttrs: {
              lang: 'es',
            },
            meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              {
                hid: 'description',
                name: 'description',
                content: 'QuickImageTable - Generador rapido de tablas con imagenes',
              },
              { name: 'format-detection', content: 'telephone=no' },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
          },
          pageTransition: { name: 'page', mode: 'out-in' }
    },
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "@/assets/styles/sass/app.scss" as *;'
          }
        }
      }
    },
    // routeRules: {
    //   '/howtouse' : { ssr: false, static: true, prerender: true },
    //   '/about' : { static: true },
    //   '/contact' : { static: true },
    //   '/' : { ssr: false, static: true, prerender: true },
    // }
})
