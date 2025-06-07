<template>
  <div class="function-manage">
    <a-row>
      <a-col :xs="24" :lg="showRoleTree ? 10 : 24">
        <function-tree @onSelect="onNodeSelect" />
      </a-col>
      <a-col :xs="24" :lg="14">
        <role-tree ref="roleTree" v-if="showRoleTree" :selected-function="selectedFunction" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FunctionTree from '@/views/application/FunctionManage/FunctionTree'
import RoleTree from '@/views/application/FunctionManage/RoleTree'

export default {
  name: 'FunctionManage',
  components: { FunctionTree, RoleTree },
  props: {},
  data() {
    return {
      selectedFunction: null
    }
  },
  computed: {
    showRoleTree() {
      return this.selectedFunction !== null
    }
  },
  methods: {
    onNodeSelect(functionNode) {
      this.selectedFunction = functionNode
      this.$nextTick(() => {
        this.$refs.roleTree.refresh()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.function-manage {
  padding: 10px;
}
</style>
