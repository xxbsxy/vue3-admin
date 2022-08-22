const { defineConfig } = require('@vue/cli-service')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: config => {
    const plugins = [require('unplugin-vue-components/webpack')({ /* options */
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })]
    return { plugins }
  }
})
