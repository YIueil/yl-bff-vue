<template>
  <div :style="{'max-height': maxHeight + 'px'}" class="pdf-preview-container">
    <div class="toolbar">
      <div class="left">
        <div class="menu"></div>
      </div>
      <div class="middle">
        <input type="text" v-model="pageNum">
        <span>/{{ totalPages }}</span>
      </div>
      <div class="right">
        <button @click="print">打印</button>
      </div>
    </div>
    <div ref="pages"></div>
  </div>
</template>

<script>
import worker from 'pdfjs-dist/build/pdf.worker.entry'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'

GlobalWorkerOptions.workerSrc = worker
export default {
  name: 'PdfFileView',
  props: {
    src: { // PDF文件路径
      type: String,
      required: true
    },
    maxHeight: {
      type: Number || 'unset',
      default: () => {
        return 'unset'
      }
    }
  },
  data() {
    return {
      pdf: null,
      pageNum: 1,
      totalPages: 0,
      page: null,
      viewport: null,
      content: null
    }
  },
  async mounted() {
    try {
      // 加载PDF文件
      const loadingTask = getDocument(this.src)
      this.pdf = await loadingTask.promise
      // 获取总页数
      this.totalPages = this.pdf.numPages
      for (let i = 1; i <= this.totalPages; i++) {
        // 创建新的canvas对象
        const canvas = document.createElement('canvas')
        // 获取第i页
        this.page = await this.pdf.getPage(i)
        // 设置画布大小
        this.viewport = this.page.getViewport({ scale: 1 })
        canvas.height = this.viewport.height
        canvas.width = this.viewport.width
        // 获取画布
        const context = canvas.getContext('2d')
        await this.page.render({
          canvasContext: context,
          viewport: this.viewport
        })
        // 添加到页面中
        this.$refs.pages.appendChild(canvas)
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    print() {
      const pages = this.$refs.pages
      const printWindow = window.open('', 'Print', 'height=600,width=800')
      printWindow.document.write('<html><head><title></title>')
      printWindow.document.write('</head><body>')
      pages.childNodes.forEach(node => {
        printWindow.document.write(`<img src="${node.toDataURL('image/png')}">`)
      })
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.onload = function() {
        printWindow.focus()
        // 打印
        printWindow.print()
        printWindow.close()
      }
    }
  }
}
</script>

<style scoped>
.pdf-preview-container {
  overflow: auto;
}

.pdf-preview-container .toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pdf-preview-container .toolbar .left {
  display: flex;
  align-items: center;
}

.pdf-preview-container .toolbar .left .menu {
  width: 24px;
  height: 24px;
  background-image: url('/src/assets/svg/logo.svg');
  background-size: cover;
}

.pdf-preview-container .toolbar .middle {
  display: flex;
  align-items: center;
}

.pdf-preview-container .toolbar .middle input[type="text"] {
  width: 60px;
  text-align: center;
  margin-right: 8px;
}

.pdf-preview-container .toolbar .right {
  display: flex;
  align-items: center;
}

.pdf-preview-container .toolbar .right button {
  margin-left: 8px;
}
</style>
