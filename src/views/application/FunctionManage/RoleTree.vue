<template>
  <a-card :bordered="false" class="function-role-ctl">
    <template slot="title">
      <a-space class="action-wrapper">
        <a-space>
          角色授权
        </a-space>
        <a-space>
          <a-button type="primary" icon="save" @click="onSave">保存</a-button>
        </a-space>
      </a-space>
    </template>
  </a-card>
</template>

<script>
export default {
  name: 'RoleTree',
  components: {},
  props: {
    selectedFunction: Object
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    onSave() {

    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.function-role-ctl {
  min-height: 600px;
}
</style>
