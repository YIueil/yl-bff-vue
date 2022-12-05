<template>
  <v-treeview
      v-model="tree"
      :open="open"
      :items="items"
      activatable
      item-key="name"
      open-on-click
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
    <template #append="{ item, open }">
      <svg v-if="!item.file" class="icon svg-icon" aria-hidden="true">
        <use :xlink:href="open ? '#yl-icon-folder-open' : '#yl-icon-folder'"></use>
      </svg>
      <svg v-else class="icon svg-icon" aria-hidden="true">
        <use :xlink:href="fileTypes[item.file]"></use>
      </svg>
    </template>
  </v-treeview>
</template>

<script>
export default {
  name: 'YMaterialTree',
  data: () => ({
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
  })
}
</script>

<style scoped>
.icon {
  height: 20px;
  width: 20px;
}

/deep/ .v-treeview-node__prepend {
  display: flex;
  align-items: center;
}
</style>
