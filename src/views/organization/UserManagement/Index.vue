<template>
  <div class="page-header-wrapper">
    <a-card :bordered="false">
      <!--  todo: 抽取search-wrapper组件  -->
      <div class="table-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="规则编号">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="调用次数">
                  <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="更新日期">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-btn-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu @click="menuClick" slot="overlay">
            <a-menu-item key="delete" v-action:删除>
              <a-icon type="delete"/>
              删除
            </a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="suspend" v-action:挂起>
              <a-icon type="lock"/>
              挂起
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="guid"
        :columns="columns"
        :data="loadData"
        :alert="false"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | moment }}
        </span>
        <span slot="modifyTime" slot-scope="text">
          {{ text | moment }}
        </span>
        <span slot="state" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)" v-action:编辑>编辑</a>
            <a-divider type="vertical" />
            <a style="color: red" @click="handleSuspend(record)" v-action:挂起>挂起</a>
          </template>
      </span>
      </s-table>
    </a-card>
    <form-modal
      ref="userModifyForm"
      :model="userModifyForm.model"
      :visible="userModifyForm.visible"
      :title="userModifyForm.title"
      :form-id="userModifyForm.formId"
      :formItems="userModifyForm.formItems"
      @submit="handleFormSubmit"
      @cancel="handleFormCancel"
    />
  </div>

</template>

<script>
import FormModal from '@/components/Modal/FormModal/Index'
import STable from '@/components/Table/STable'
import columns from '@/utils/columns'
// 动态查询
import QueryParam from '@/models/QueryParam'
import { searchPage } from '@/api/commmon-service'
// 表单定义
import form from '@/utils/form'
// 服务
import organizationService from '@/api/organization-service'
import userService from '@/api/user-service'

const statusMap = {
  offline: {
    status: 'default',
    text: '离线'
  },
  online: {
    status: 'success',
    text: '在线'
  },
  suspend: {
    status: 'error',
    text: '挂起'
  }
}
export default {
  name: 'UserManagement',
  components: {
    FormModal,
    STable
  },
  props: {},
  data() {
    return {
      // 表格列定义
      columns: columns.userManagementTable,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = Object.assign({}, parameter, this.queryParam)
        const data = new QueryParam(
          null,
          'user.xml',
          'getUserList',
          {},
          null
        )
        return searchPage(params, data)
      },
      selectedRowKeys: [],
      selectedRows: [],
      // 弹出框
      userModifyForm: {
        model: null,
        formId: 'userModifyForm',
        visible: false,
        formItems: form.userEditForm
      }
    }
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  watch: {},
  methods: {
    refresh() {
      this.$refs.table.refresh(true)
    },
    handleAdd() {
      this.model = null
      this.$set(this.userModifyForm, 'title', '新增用户')
      this.$set(this.userModifyForm, 'formItems', form.userAddForm)
      this.$set(this.userModifyForm, 'visible', true)
    },
    handleEdit(record) {
      // 操作表格数据时, 操作clone对象
      const cloneRecord = this.cloneDeep(record)
      this.$set(this.userModifyForm, 'model', cloneRecord)
      this.$set(this.userModifyForm, 'title', '编辑用户')
      this.$set(this.userModifyForm, 'formItems', form.userEditForm)
      this.$set(this.userModifyForm, 'visible', true)
    },
    handleOk() {
    },
    handleCancel() {
      this.visible = false
      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {}
    },
    async deleteSelectedRows() {
      const userIds = this.selectedRows.map(row => row.id)
      await userService.delUserByIds(userIds)
      this.$message.success('批量删除成功')
      this.refresh()
    },
    async suspendSelectedRows() {
      const userIds = this.selectedRows.map(row => row.id)
      await userService.suspendUserByIds(userIds)
      this.$message.success('批量挂起成功')
      this.refresh()
    },
    async handleSuspend(record) {
      await userService.suspendUser({
        userId: record.id
      })
      this.$message.success('挂起成功')
      this.refresh()
    },
    async handleDelete(record) {
      await userService.delUser({
        userId: record.id
      })
      this.$message.success('删除成功')
      this.refresh()
    },
    menuClick({ key }) {
      switch (key) {
      case 'delete':
        this.deleteSelectedRows()
        break
      case 'suspend':
        this.suspendSelectedRows()
        break
      }
    },
    // 表单
    async handleFormSubmit(data) {
      console.log('处理提交', data)
      try {
        if (data.id) {
          await organizationService.modifyUser(data)
          this.$message.success('修改成功')
        } else {
          await organizationService.addUser(data)
          this.$message.success('添加成功')
        }
        this.refresh()
      } catch (e) {
        console.error(e)
      }
      this.$set(this.userModifyForm, 'visible', false)
    },
    handleFormCancel() {
      console.log('处理取消')
      this.$set(this.userModifyForm, 'visible', false)
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type]?.text || '未知'
    },
    statusTypeFilter(type) {
      return statusMap[type]?.status || 'default'
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.page-header-wrapper {
  padding: 10px;
}
</style>
