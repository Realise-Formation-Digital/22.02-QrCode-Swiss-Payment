const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'QR-code',
    themeColor: '#000000',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'no',
    appleMobileWebAppStatusBarStyle: 'default',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/registerServiceWorker.js',
      // ...other Workbox options...
    }
  }
})
