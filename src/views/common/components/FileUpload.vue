<template>
  <div>
    <div :key="file.guid" v-for="file in fileList">
      {{ file.fileName }}
      <button>预览</button>
      <button>下载</button>
      <button>删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    listFile() {

    }
  },
  mounted() {
    this.listFile()
  }
}
</script>

<style scoped lang="less">

</style>
