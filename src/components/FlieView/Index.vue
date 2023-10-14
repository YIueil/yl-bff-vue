<template>
  <div class="viewer-container">
    <pdf-viewer v-if="fileExtensions === 'pdf'" :src="src"/>
    <image-viewer v-else-if="fileExtensions === 'image'" :src="src"/>
  </div>
</template>

<script>
import PdfViewer from '@/components/FlieView/pdf/PdfViewer'
import ImageViewer from '@/components/FlieView/img/ImageViewer'

export default {
  name: 'FileViewer',
  components: { ImageViewer, PdfViewer },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fileExtensions: null
    }
  },
  computed: {},
  mounted() {
    // 获取文件扩展名
    const fileExtensions = this.src.split('.').pop().toLowerCase()
    // 根据文件扩展名呈现不同的视图
    if (['pdf'].includes(fileExtensions)) {
      this.fileExtensions = 'pdf'
    } else if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtensions)) {
      this.fileExtensions = 'image'
    }
  }
}
</script>

<style lang="less" scoped>
.viewer-container {
  height: 700px;
  iframe {
    width: 100%;
    height: 100%;
    padding: 0;
  }
  img {
    width: 100%;
  }
}
</style>
