<template>
  <div id="container">
    <div>
      <button v-print="print">打印</button>
      <a-input v-model="msg"></a-input>
    </div>
    <div id="printMe">
      {{ msg }}
      <p style="color:red;">葫芦娃，葫芦娃</p>
      <strong><p>一根藤上七朵花 </p></strong>
      <p>小小树藤是我家 啦啦啦啦 </p>
      <p>叮当当咚咚当当 浇不大</p>
      <p> 叮当当咚咚当当 是我家</p>
      <p> 啦啦啦啦</p>
      <p>...</p>
    </div>
  </div>
</template>

<script>
import { Watermark } from 'watermark-js-plus'

export default {
  name: 'PrintComponent',
  data() {
    const that = this
    return {
      msg: 'Hello',
      print: {
        id: 'printMe',
        popTitle: '配置页眉标题', // 打印配置页上方的标题
        extraHead: '打印', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
        preview: false, // 是否启动预览模式，默认是false
        previewTitle: '预览的标题', // 打印预览的标题
        previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
        zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
        previewBeforeOpenCallback() {
          console.log('正在加载预览窗口！')
          console.log(that.msg, this)
        }, // 预览窗口打开之前的callback
        previewOpenCallback() {
          console.log('已经加载完预览窗口，预览打开了！')
        }, // 预览窗口打开时的callback
        beforeOpenCallback() {
          console.log('开始打印之前！')
        }, // 开始打印之前的callback
        openCallback() {
          console.log('执行打印了！')
        }, // 调用打印时的callback
        closeCallback() {
          console.log('关闭了打印工具！')
        }, // 关闭打印的callback(无法区分确认or取消)
        clickMounted() {
          console.log('点击v-print绑定的按钮了！')
        },
        // url: 'http://localhost:8080/', // 打印指定的URL，确保同源策略相同
        // asyncUrl (reslove) {
        //   setTimeout(() => {
        //     reslove('http://localhost:8080/')
        //   }, 2000)
        // },
        standard: '',
        extarCss: ''
      }
    }
  },
  methods: {},
  mounted() {
    // 文档页 https://zhensherlock.github.io/watermark-js-plus/zh/guide/custom/configs.html
    const watermark = new Watermark({
      parent: '#printMe',
      'width': 720,
      'height': 600,
      'rotate': 20,
      'contentType': 'text',
      'content': '国土空间用途管制',
      'globalAlpha': 1,
      'mode': 'default',
      'textType': 'fill',
      'lineHeight': 30,
      'fontSize': '70px',
      'fontFamily': 'sans-serif',
      'fontColor': '#474747',
      'fontWeight': 'normal',
      'filter': 'none',
      'letterSpacing': '20px'
    })


    watermark.create()
  }
}
</script>

<style scoped>

</style>
