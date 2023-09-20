/**
 * Author: YIueil
 * Date: 2023/9/20 11:52
 * Description: 皮肤插件替换方法
 */
import client from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate'

export default {
  getAntdSerials(color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10)
    })
    // colorPalette变换得到颜色值
    const colorPalettes = generate(color)
    const rgb = client.varyColor.toNum3(color.replace('#', '')).join(',')
    return lightens.concat(colorPalettes).concat(rgb)
  },
  changeColor(newColor) {
    const options = {
      newColors: this.getAntdSerials(newColor),
      changeUrl(cssUrl) {
        return `/${cssUrl}`
      }
    }
    return client.changer.changeColor(options, Promise)
  }
}
