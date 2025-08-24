<template>
  <div>
    文件下载示例
    <div :key="file.guid" v-for="file in fileList">
      {{ file.fileName }}
      <button @click="previewFile(file)">预览</button>
      <button @click="downloadFile(file)">下载</button>
      <button @click="removeFile(file)">删除</button>
    </div>
  </div>
</template>

<script>
import resourceService from '@/api/resource-service'
export default {
  name: 'FileUpload',
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      fileList: [],
      tempUrlList: []
    }
  },
  methods: {
    async loadFile(guid) {
      const response = await resourceService.previewFile(guid)
      return response.data
    },
    async listFile() {
      this.fileList = await resourceService.listFile()
    },
    async removeFile() {

    },
    async previewFile(file) {
      const blobData = await this.loadFile(file.guid)
      const tempUrl = URL.createObjectURL(blobData)
      this.tempUrlList.push(tempUrl)
      this.$confirm({
        title: 'Confirm',
        content: h => h('img', {
          attrs: {
            src: tempUrl
          }
        }),
        okText: '确认',
        cancelText: '取消'
      })
    },
    downloadFile() {

    }
  },
  mounted() {
    this.listFile()
  },
  beforeDestroy() {
    for (const url of this.tempUrlList) {
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped lang="less">

</style>
