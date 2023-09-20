<template>
  <div>
    <a-breadcrumb separator="/">
      <a-breadcrumb-item v-for="item in breadcrumb" :key="item.title" href="">
        <a :href="item.path" @click.prevent="$router.push(item.path)">
          <a-icon :type="item.icon"/>
          <span>{{ item.title }}</span>
        </a>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <router-view/>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbLayout',
  components: {},
  props: {},
  data() {
    return {
      breadcrumb: this.$route.meta.breadcrumb
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {}
}
</script>

<style scoped>

</style>
