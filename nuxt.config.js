module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '个人主页',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '个人主页' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#1296db' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    'assets/reset.css'
  ],
  plugins: ['~/plugins/mint'],
  router:{
    linkActiveClass: 'active-link',
    routes:[
      {
        name:'magazine',
        path:'/magazine',
        component:'pages/magazine/index.vue'
      },
      {
        name:'movie',
        path:'/movie',
        component:'pages/movie/index.vue'
      },
      {
        name:'tool',
        path:'/tool',
        component:'pages/tool/index.vue'
      },
      {
        path:'/blog',
        component:'pages/blog.vue',
        children:[
          {
            path:'',
            name:'blog',
            component:'pages/blog/index.vue'
          },
          {
            path:'/article',
            name:'article',
            component:'pages/blog/article.vue'
          },
          {
            path:'/album',
            name:'album',
            component:'pages/blog/album.vue'
          },
        ]
      }
    ]
  }
}
