module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '个人主页',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '个人主页' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
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
    vendor: ['axios', 'moment'],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  css: [
    'assets/reset.css',
  ],
  plugins: [
    '~/plugins/mint',
    '~/plugins/axios',
    '~/plugins/filter',
  ],
  router: {
    linkActiveClass: 'active-link',
  },
};
