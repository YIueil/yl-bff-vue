<template>
  <a-row>
    <a-col :xs="24" :lg="10">
      <function-tree/>
    </a-col>
    <a-col :xs="24" :lg="14">
      <role-tree/>
    </a-col>
  </a-row>
</template>

<script>
import FunctionTree from '@/views/application/FunctionManage/FunctionTree'
import RoleTree from '@/views/application/FunctionManage/RoleTree'

export default {
  name: 'FunctionManage',
  components: { FunctionTree, RoleTree },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
