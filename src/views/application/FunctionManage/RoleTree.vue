<template>
  <a-card :bordered="false" class="function-role-ctl">
    <template slot="title">
      <a-space class="action-wrapper">
        <a-space>
          角色授权
        </a-space>
        <a-space>
          <a-button type="primary" icon="save" @click="onSave">保存</a-button>
        </a-space>
      </a-space>
    </template>
    <a-tree
      checkable
      :check-strictly="true"
      :replace-fields="replaceFields"
      :expanded-keys="expandedKeys"
      :selected-keys="selectedKeys"
      :checked-keys="checkedKeys"
      :tree-data="treeData"
      @expand="onExpand"
      @select="onSelect"
      @check="onCheck"
    >
      <template slot="title" slot-scope="{ name }">
        <a-icon slot="switcherIcon" type="team" /> {{ name }}
      </template>
    </a-tree>
  </a-card>
</template>

<script>
import { findNodes } from '@/utils/tree'
import { applicationAuthorization } from '@/api/application-service'
import roleService from '@/api/role-service'

export default {
  name: 'RoleTree',
  components: {},
  props: {
    selectedFunction: Object
  },
  data() {
    return {
      replaceFields: { children: 'children', title: 'name', key: 'id' },
      expandedKeys: [],
      selectedKeys: [],
      checkedKeys: [],
      treeData: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      this.getTreeData()
    },
    refresh() {
      this.getTreeData()
    },
    async getTreeData() {
      this.treeData = await roleService.getRoleTree({
        functionId: this.selectedFunction.id
      })
      if (this.treeData.length > 0) {
        this.expandedKeys.push(this.treeData[0].id)
        this.checkedKeys = findNodes(this.treeData, 'hasFunction', true).map(node => node.id)
      }
    },
    async onSave() {
      await applicationAuthorization({
        functionId: this.selectedFunction.id
      }, this.checkedKeys)
      this.refresh()
      this.$message.success('保存成功')
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    onSelect(selectedKeys, { selected, node }) {
      this.selectedKeys = selectedKeys
      console.log(selected, node)
    },
    onCheck({ checked }) {
      console.log(checked)
      this.checkedKeys = checked
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.function-role-ctl {
  min-height: 600px;
}
</style>
