<template>
  <a-card :bordered="false" class="organization-ctrl">
    <template slot="title">
      <a-space class="action-wrapper">
        <a-space>
          机构管理
          <a-input-search placeholder="搜索机构" enter-button @search="onOrgSearch" />
        </a-space>
        <a-space>
          <a-button type="primary" icon="plus" @click="handleAddOrganization">新增</a-button>
          <a-button type="default" icon="edit" @click="handleEditOrganization">编辑</a-button>
          <a-button type="danger" icon="delete" :disabled="selectNode === null" @click="handleDeleteOrganization">删除</a-button>
        </a-space>
      </a-space>
    </template>
    <a-tree
      :replaceFields="replaceFields"
      :expanded-keys="expandedKeys"
      :selected-keys="selectedKeys"
      :tree-data="treeData"
      @expand="onExpand"
      @select="onSelect"
    >
      <template #title="{ name, dataRef: { type } }">
        <a-icon :type="type === '行政区' ? 'environment' : type === '单位' ? 'apartment'  : 'branches'" />
        {{ name }}
      </template>
    </a-tree>
    <form-modal
      :visible="orgModal.visible"
      :title="orgModal.title"
      :form-id="orgModal.formId"
      :form-items="orgModal.formItems"
      :model="orgModal.model"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </a-card>
</template>

<script>
import organizationService from '@/api/organization-service'
import form from '@/utils/form'
import FormModal from '@/components/Modal/FormModal/Index'
export default {
  name: 'OrgTree',
  components: { FormModal },
  props: {},
  data() {
    return {
      replaceFields: { children: 'children', title: 'name', key: 'id' },
      expandedKeys: [],
      selectedKeys: [],
      selectNode: null,
      treeData: [],
      // modal
      orgModal: {
        formId: 'orgModal',
        visible: false,
        title: '',
        formItems: form.orgAddForm,
        model: null
      }
    }
  },
  computed: {},
  methods: {
    init() {
      this.getTreeData()
    },
    async getTreeData() {
      this.treeData = await organizationService.getOrgTree()
      if (this.treeData.length > 0) {
        this.expandedKeys.push(this.treeData[0].id)
      }
    },
    onOrgSearch() {
      this.getTreeData()
    },
    async handleDeleteOrganization() {
      await organizationService.deleteOrg({
        id: this.selectNode.id
      })
      this.selectNode = null
      this.$message.success('删除机构成功')
      await this.getTreeData()
    },
    handleAddOrganization() {
      this.$set(this.orgModal, 'title', '添加机构')
      this.$set(this.orgModal, 'model', {
        parentId: this.selectNode?.id || 0,
        parentName: this.selectNode?.name
      })
      this.$set(this.orgModal, 'formItems', form.orgAddForm)
      this.$set(this.orgModal, 'visible', true)
    },
    handleEditOrganization() {
      this.$set(this.orgModal, 'title', '编辑机构')
      this.$set(this.orgModal, 'model', this.cloneDeep(this.selectNode))
      this.$set(this.orgModal, 'formItems', form.orgEditForm)
      this.$set(this.orgModal, 'visible', true)
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    onSelect(selectedKeys, { selected, node }) {
      this.selectedKeys = selectedKeys
      const nodeClone = this.cloneDeep(node.dataRef)
      // 展开节点
      if (!this.expandedKeys.includes(nodeClone.id)) {
        this.expandedKeys.push(nodeClone.id)
      }
      if (selected) {
        this.selectNode = node.dataRef
        this.$set(this.orgModal, 'model', {
          parentId: nodeClone.id,
          parentName: nodeClone.name
        })
        this.$emit('onSelect', nodeClone)
      } else {
        this.selectNode = null
      }
    },
    async onSubmit(data) {
      try {
        if (data.id) {
          const newOrg = await organizationService.updateOrg(data)
          this.selectNode = this.cloneDeep(newOrg)
          this.$message.success('机构编辑成功')
        } else {
          await organizationService.addOrg(data)
          this.$message.success('机构添加成功')
        }
        this.$set(this.orgModal, 'visible', false)
        await this.getTreeData()
      } catch (e){
        console.error(e)
      }
    },
    onCancel() {
      this.$set(this.orgModal, 'visible', false)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.organization-ctrl {
  min-height: 600px;
}
</style>
