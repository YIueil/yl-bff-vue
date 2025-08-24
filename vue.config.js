const createThemeColorReplacerPlugin = require('./public/plugins/themeReplacePlugin')
const packageJson = require('./package.json')
const buildDate = JSON.stringify(new Date().toLocaleString())
const webpack = require('webpack')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 3000
    // 为什么无效
    // proxy: {
    //   // 代理配置
    //   '/resource/file/preview/a1ec71dcaf8941a180318d2e3506dd5b': {
    //     target: 'http://localhost:20000',
    //     changeOrigin: true
    //   }
    // }
  },
  transpileDependencies: true,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin({
        contextRegExp: /^\.\/locale$/,
        resourceRegExp: /moment$/
      }),
      new webpack.DefinePlugin({
        APP_VERSION: `"${packageJson.version}"`,
        BUILD_DATE: buildDate
      }),
      createThemeColorReplacerPlugin()
    ]
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 默认主题样式
          // 'primary-color': '#1DA57A',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  }
})
