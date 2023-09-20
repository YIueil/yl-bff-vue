const createThemeColorReplacerPlugin = require('./plugins/themeReplacePlugin')
const packageJson = require('./package.json')
const buildDate = JSON.stringify(new Date().toLocaleString())
const webpack = require('webpack')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
