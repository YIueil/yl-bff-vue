<template>
  <div class="app-page">
    <a-card hoverable class="app">
      <template slot="actions">
        <a-icon key="setting" type="setting" />
        <a-icon key="edit" type="edit" />
        <a-icon key="ellipsis" type="ellipsis" />
      </template>
      <a-card-meta title="Card title" description="This is the description">
        <a-avatar
          slot="avatar"
          src="https://s2.loli.net/2024/01/19/7WDJr9RLxuiPeZQ.jpg"
        />
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'AppPage',
  components: {},
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

<style lang="less" scoped>
.app-page {
  .app {
    width: 50%;
    text-align: center;
    .app-image {
      width: 192px;
      height: 108px;
    }
  }
}
</style>
