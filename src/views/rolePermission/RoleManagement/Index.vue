<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col :xs="24" :lg="showUserTable ? 10 : 24">
        <role-tree ref="roleTree" @onSelect="loadUserTableData" />
      </a-col>
      <a-col :xs="24" :lg="14">
        <user-table v-if="showUserTable" :roleNode="roleNode" ref="userTable" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UserTable from '@/views/rolePermission/RoleManagement/UserTable'
import RoleTree from '@/views/rolePermission/RoleManagement/RoleTree'

export default {
  name: 'RoleManagement',
  components: {
    UserTable,
    RoleTree
  },
  data() {
    return {
      roleNode: null
    }
  },
  computed: {
    showUserTable() {
      return this.roleNode !== null
    }
  },
  methods: {
    loadUserTableData(roleNode) {
      // console.log('loadUserTableData', orgNode)
      this.roleNode = roleNode
      this.$nextTick(() => {
        this.$refs.userTable.refresh()
      })
    }
  }
}
</script>
