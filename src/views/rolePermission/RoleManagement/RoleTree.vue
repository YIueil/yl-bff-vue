<template>
  <a-card :bordered="false" class="role-ctrl">
    <template slot="title">
      <a-space class="action-wrapper">
        <a-space>
          角色管理
          <a-input-search placeholder="搜索角色" enter-button @search="onRoleSearch" />
        </a-space>
        <a-space>
          <a-button type="primary" icon="plus" @click="handleAddRole" v-action:新增>新增</a-button>
          <a-button type="default" icon="edit" @click="handleEditRole" v-action:编辑>编辑</a-button>
          <a-button type="danger" icon="delete" :disabled="selectNode === null" @click="handleDeleteRole" v-action:删除>删除</a-button>
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
      <template slot="title" slot-scope="{ name }">
        <a-icon slot="switcherIcon" type="team" /> {{ name }}
      </template>
    </a-tree>
    <form-modal
      :visible="roleModal.visible"
      :title="roleModal.title"
      :form-id="roleModal.formId"
      :form-items="roleModal.formItems"
      :model="roleModal.model"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </a-card>
</template>

<script>
import roleService from '@/api/role-service'
import form from '@/utils/form'
import FormModal from '@/components/Modal/FormModal/Index'
export default {
  name: 'RoleTree',
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
      roleModal: {
        formId: 'roleModal',
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
      this.treeData = await roleService.getRoleTree()
      if (this.treeData.length > 0) {
        this.expandedKeys.push(this.treeData[0].id)
      }
    },
    onRoleSearch() {
      this.getTreeData()
    },
    async handleDeleteRole() {
      await roleService.deleteRole({
        roleId: this.selectNode.id
      })
      this.selectNode = null
      this.$message.success('删除角色成功')
      await this.getTreeData()
    },
    handleAddRole() {
      this.$set(this.roleModal, 'title', '添加角色')
      this.$set(this.roleModal, 'model', {
        parentId: this.selectNode?.id || 0,
        parentName: this.selectNode?.name
      })
      this.$set(this.roleModal, 'formItems', form.roleAddForm)
      this.$set(this.roleModal, 'visible', true)
    },
    handleEditRole() {
      this.$set(this.roleModal, 'title', '编辑角色')
      this.$set(this.roleModal, 'model', this.cloneDeep(this.selectNode))
      this.$set(this.roleModal, 'formItems', form.roleEditForm)
      this.$set(this.roleModal, 'visible', true)
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
        this.$set(this.roleModal, 'model', {
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
          const newRole = await roleService.updateRole(data)
          this.selectNode = this.cloneDeep(newRole)
          this.$message.success('角色编辑成功')
        } else {
          await roleService.addRole(data)
          this.$message.success('角色添加成功')
        }
        this.$set(this.roleModal, 'visible', false)
        await this.getTreeData()
      } catch (e){
        console.error(e)
      }
    },
    onCancel() {
      this.$set(this.roleModal, 'visible', false)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.role-ctrl {
  min-height: 600px;
}
</style>
