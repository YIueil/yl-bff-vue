<template>
  <v-treeview
      v-model="tree"
      :open="open"
      :items="items"
      :transition="true"
      expand-icon="mdi-menu-down"
      item-key="name"
      activatable
      dense
  >
    <template #prepend="{ item, open }">
      <svg v-if="!item.file" class="icon svg-icon" aria-hidden="true">
        <use :xlink:href="open ? '#yl-icon-folder-open' : '#yl-icon-folder'"></use>
      </svg>
      <svg v-else class="icon svg-icon" aria-hidden="true">
        <use :xlink:href="fileTypes[item.file]"></use>
      </svg>
    </template>
    <template #append>
      <v-icon
          dense
          v-for="handleItem in handleTypes"
          :color="handleItem.color"
          :key="handleItem.handle"
          @click.stop="handleItem.cb"
          v-bind:title="handleItem.description"
          class="ma-1">
        {{ handleItem.icon }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
export default {
  name: 'YMaterialTree',
  data() {
    return {
      open: ['public'],
      fileTypes: {
        html: '#yl-icon-html',
        js: '#yl-icon-js',
        json: '#yl-icon-json',
        md: '#yl-icon-markdown',
        pdf: '#yl-icon-pdf',
        png: '#yl-icon-image',
        txt: '#yl-icon-txt',
        xls: '#yl-icon-xls'
      },
      handleTypes: [{
        icon: 'mdi-eye',
        handle: 'eye',
        description: '预览',
        color: 'blue',
        cb: this.preview
      }, {
        icon: 'mdi-download',
        handle: 'download',
        description: '下载',
        color: 'green',
        cb: this.download
      }, {
        icon: 'mdi-upload',
        handle: 'upload',
        description: '上传',
        color: 'green',
        cb: this.download
      }, {
        icon: 'mdi-delete',
        handle: 'delete',
        description: '删除',
        color: 'red',
        cb: this.delete
      }, {
        icon: 'mdi-folder-plus',
        handle: 'addFolder',
        description: '新建目录',
        color: '#aeb9c0',
        cb: this.addFolder
      }, {
        icon: 'mdi-folder-arrow-down',
        handle: 'folder-folder-arrow-down',
        description: '打包下载',
        color: '#aeb9c0',
        cb: this.packageDownload
      }],
      tree: [],
      items: [
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png'
              }]
            },
            {
              name: 'favicon.ico',
              file: 'txt'
            },
            {
              name: 'xls',
              file: 'xls'
            }
          ]
        }
      ]
    }
  },
  methods: {
    preview() {

    },
    download() {

    },
    upload() {

    },
    delete() {

    },
    addFolder() {

    },
    packageDownload() {

    }
  }
}
</script>

<style scoped>
.icon {
  height: 20px;
  width: 20px;
}

::v-deep(.v-treeview-node__prepend) {
  display: flex;
  align-items: center;
}
</style>
