<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col :xs="24" :lg="showUserTable ? 10 : 24">
        <org-tree ref="orgTree" @onSelect="loadUserTableData" />
      </a-col>
      <a-col :xs="24" :lg="14">
        <user-table v-if="showUserTable" :orgNode="orgNode" ref="userTable" />
      </a-col>
    </a-row>
  </div>
</template>

<script>

import OrgTree from '@/views/organization/OrganizationManagement/OrgTree'
import UserTable from '@/views/organization/OrganizationManagement/UserTable'
export default {
  name: 'OrganizationManagement',
  components: {
    UserTable,
    OrgTree
  },
  data() {
    return {
      orgNode: null
    }
  },
  computed: {
    showUserTable() {
      return this.orgNode !== null
    }
  },
  methods: {
    loadUserTableData(orgNode) {
      // console.log('loadUserTableData', orgNode)
      this.orgNode = orgNode
      this.$nextTick(() => {
        this.$refs.userTable.refresh()
      })
    }
  }
}
</script>
