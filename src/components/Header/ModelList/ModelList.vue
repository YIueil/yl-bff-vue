<template>
  <a-menu v-model="currentModel" mode="horizontal">
    <a-menu-item key="ACC">
      <a-icon type="appstore" />
      {{ isMobile ? 'ACC' : '机构角色' }}
    </a-menu-item>
    <a-menu-item key="DAP" disabled>
      <a-icon type="appstore" />
      {{ isMobile ? 'DAP' : '业务流程' }}
    </a-menu-item>
  </a-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ModelList',
  components: {},
  props: {},
  data() {
    return {
      currentModel: ['ACC']
    }
  },
  computed: {
    ...mapGetters(['isMobile'])
  },
  watch: {},
  methods: {},
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.ant-menu-horizontal {
  line-height: 62px;
}
</style>
