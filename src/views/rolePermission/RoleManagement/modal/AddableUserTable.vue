<template>
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
  </s-table>
</template>

<script>
import STable from '@/components/Table/STable'
import columns from '@/utils/columns'
import QueryParam from '@/models/QueryParam'
import { searchPage } from '@/api/commmon-service'

export default {
  name: 'AddableUserTable',
  components: {
    STable
  },
  props: {
    roleIds: Array
  },
  data() {
    return {
      columns: columns.addableUserTable,
      selectedRowKeys: [],
      selectedRows: []
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
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    loadUserData(parameter) {
      return searchPage(parameter, new QueryParam(null, 'user.xml', 'addAbleUserList', {
        notInRoleIds: this.roleIds
      }, null))
    }
  }
}
</script>

<style scoped>

</style>
