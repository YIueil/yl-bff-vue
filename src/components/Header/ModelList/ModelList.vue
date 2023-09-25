<template>
  <a-menu :selectedKeys="selectedKeys" mode="horizontal" @click="changeModel">
    <a-menu-item v-for="model in modelList" :key="model.id">
      <a-icon :type="model.icon"/>
      {{ isMobile ? model.shortName : model.name }}
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
    return {}
  },
  computed: {
    ...mapGetters(['isMobile', 'modelList', 'currentModel']),
    selectedKeys() {
      return [this.currentModel.id]
    }
  },
  watch: {},
  methods: {
    changeModel({ key }) {
      this.$store.commit('UPDATE_MODEL', key)
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.ant-menu-horizontal {
  line-height: 62px;
}
</style>
