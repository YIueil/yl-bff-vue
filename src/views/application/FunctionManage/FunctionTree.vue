<template>
  <div>
    <a-card :bordered="false" class="role-ctrl">
      <template slot="title">
        <a-space class="action-wrapper">
          <a-space>
            所属应用
            <a-select style="min-width: 120px" @select="onSelectApp" :value="selectAppId">
              <a-select-option v-for="application in manageApplications" :key="application.id" :value="application.id">
                {{ application.name }}
              </a-select-option>
            </a-select>
          </a-space>
          <a-space>
            <a-button type="primary" icon="plus" :disabled="selectApp === null" @click="handleAddFunction">新增</a-button>
            <a-button type="default" icon="edit" :disabled="selectApp === null" @click="handleEditFunction">编辑
            </a-button>
            <a-button type="danger" icon="delete" :disabled="selectNode === null" @click="handleDeleteFunction">删除
            </a-button>
          </a-space>
        </a-space>
      </template>
      <a-tree
        :replaceFields="replaceFields"
        :expanded-keys="expandedKeys"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect">
        <template #title="{ name, dataRef: { type }}">
          <a-icon :type="type === '菜单' ? 'menu' : type === '按钮' ? 'thunderbolt' : 'api'" />
          {{ name }}
        </template>
      </a-tree>
    </a-card>
    <form-modal
      :title="modal.title"
      :form-id="modal.formId"
      :form-items="modal.formItems"
      :model="modal.model"
      :visible="modal.visible"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>

</template>

<script>
import QueryParam from '@/models/QueryParam'
import { searchPage } from '@/api/commmon-service'
import { mapGetters } from 'vuex'
import FormModal from '@/components/Modal/FormModal/Index'
import form from '@/utils/form'
import applicationService from '@/api/application-service'

export default {
  name: 'FunctionTree',
  components: { FormModal },
  props: {},
  data() {
    return {
      selectApp: null,
      selectAppId: null,
      manageApplications: [],
      selectNode: null,
      // functionTree
      replaceFields: { children: 'children', title: 'name', key: 'id' },
      expandedKeys: [],
      selectedKeys: [],
      treeData: [],
      // appFormModal
      modal: {
        title: '',
        formItems: form.functionAddForm,
        formId: 'functionForm',
        model: null,
        visible: false
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  methods: {
    init() {
      this.getManageApplicationList()
    },
    async getApplicationFunctionTree() {
      this.treeData = await applicationService.getApplicationFunctionTree({ applicationId: this.selectApp.id })
    },
    async getManageApplicationList() {
      const params = {
        pageIndex: 1,
        pageSize: 9999
      }
      const result = await searchPage(params, new QueryParam(null, 'application.xml', 'getManageApplicationList', {
        userId: this.userInfo.id
      }, null))
      if (result.body) {
        this.manageApplications = result.body
        this.selectAppId = this.manageApplications[0]?.id
        this.selectApp = this.manageApplications[0]
        await this.getApplicationFunctionTree()
      }
    },
    // functionTree
    onSelectApp(applicationId) {
      this.selectAppId = applicationId
      this.selectApp = this.manageApplications.find(application => application.id === applicationId)
      this.getApplicationFunctionTree()
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    onSelect(selectedKeys, { selected, node }) {
      this.selectedKeys = selectedKeys
      const nodeClone = this.cloneDeep(node.dataRef)
      if (!this.expandedKeys.includes(nodeClone.id)) {
        this.expandedKeys.push(nodeClone.id)
      }
      // 展开节点
      if (selected) {
        this.selectNode = node.dataRef
        this.$set(this.modal, 'model', {
          parentId: nodeClone.id,
          parentName: nodeClone.name
        })
        this.$emit('onSelect', nodeClone)
      } else {
        this.selectNode = null
      }
    },
    // buttonGroup
    handleAddFunction() {
      this.$set(this.modal, 'formItems', form.functionEditForm)
      this.$set(this.modal, 'model', {
        parentId: this.selectNode?.id || 0,
        parentName: this.selectNode?.name,
        applicationId: this.selectApp?.id,
        applicationName: this.selectApp?.name
      })
      this.$set(this.modal, 'title', '添加功能')
      this.$set(this.modal, 'visible', true)
    },
    handleEditFunction() {
      this.$set(this.modal, 'formItems', form.functionEditForm)
      const model = this.cloneDeep(this.selectNode)
      model.applicationName = this.selectApp?.name
      this.$set(this.modal, 'model', model)
      this.$set(this.modal, 'title', '修改功能')
      this.$set(this.modal, 'visible', true)
    },
    async handleDeleteFunction() {
      console.log('handleDeleteFunction')
      await applicationService.delApplicationFunction({
        functionId: this.selectNode.id
      })
      this.$message.success('删除成功')
      await this.getApplicationFunctionTree()
    },
    async handleSubmit(formData) {
      console.log(formData)
      if (formData.id) {
        this.selectNode = await applicationService.updateApplicationFunction(formData)
        this.$message.success('修改成功')
      } else {
        await applicationService.addApplicationFunction(formData)
        this.$message.success('添加成功')
      }
      this.$set(this.modal, 'visible', false)
      await this.getApplicationFunctionTree()
    },
    handleCancel() {
      this.$set(this.modal, 'visible', false)
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
