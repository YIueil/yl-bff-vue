<template>
  <a-card :bordered="false" class="user-table">
    <template slot="title">
      <a-space class="action-wrapper">
        机构成员
        <a-space>
          <a-button type="primary" icon="plus" :disabled="!orgNode.id" @click="handleAdd">加入</a-button>
        </a-space>
      </a-space>
    </template>
    <s-table
      ref="OrgUserTable"
      size="default"
      rowKey="guid"
      :columns="columns"
      :data="loadUserData"
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
      <span slot="action" slot-scope="text, record">
          <template>
            <a style="color: red" @click="removeUserFromOrg(record)">调离</a>
          </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import columns from '@/utils/columns'
import STable from '@/components/Table/STable'
import { searchPage } from '@/api/commmon-service'
import { addOrgUser } from '@/api/organization-service'
import QueryParam from '@/models/QueryParam'
import AddableUserTable from '@/views/organization/OrganizationManagement/modal/AddableUserTable'

export default {
  name: 'UserTable',
  components: {
    STable
  },
  props: {
    orgNode: Object
  },
  data() {
    return {
      columns: columns.orgUserTable,
      selectedRowKeys: []
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
    init() {
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    loadUserData(parameter) {
      return searchPage(parameter, new QueryParam(null, 'user.xml', 'getOrgUserList', {
        orgId: this.orgNode.id
      }, null))
    },
    handleAdd() {
      const _this = this
      this.$dialog(
        AddableUserTable,
        {
          orgIds: [this.orgNode.id],
          on: {
            async ok(ctl) {
              const userIds = ctl.selectedRows.map(row => row.id)
              await addOrgUser({
                orgId: _this.orgNode.id
              }, userIds)
              _this.refresh()
              _this.$message.success('添加成功')
            },
            cancel() {
              console.log('cancel 回调')
            },
            close() {
              console.log('modal close 回调')
            }
          }
        },
        {
          title: '加入用户',
          width: 1200,
          centered: true,
          maskClosable: false
        }
      )
    },
    removeUserFromOrg(record) {
      console.log('移除', record)
    },
    refresh() {
      this.$refs.OrgUserTable.refresh(true)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.user-table {
  min-height: 600px
}
</style>
