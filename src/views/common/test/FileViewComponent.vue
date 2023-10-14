<template>
  <div>
    预览功能测试
    <a-space>
      <div>pdf预览</div>
      <a-input v-model="fileUrl"/>
      <a-button type="primary" @click="openFileView">打开pdf预览测试</a-button>
    </a-space>
  </div>
</template>

<script>
import FileView from '@/components/FlieView/Index'

export default {
  name: 'FileViewComponent',
  props: {},
  data() {
    return {
      fileUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
    }
  },
  computed: {},
  watch: {},
  methods: {
    openFileView() {
      this.$dialog(
        FileView,
        {
          src: this.fileUrl,
          maxHeight: 800,
          on: {
            ok() {
              console.log('ok 回调')
            },
            cancel() {
              console.log('cancel 回调')
            },
            close() {
              console.log('modal close 回调')
            }
          }
        },
        {
          title: '预览',
          width: 700,
          centered: true,
          maskClosable: false
        }
      )
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
