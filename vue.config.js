const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  configureWebpack: config => {
    config.resolve.fallback = {
      // "http": require.resolve("stream-http") ,
      // "https": require.resolve("https-browserify"),
    }
  }
})
