<template functional>
<a-sub-menu :key="props.menuInfo.id">
  <span slot="title">
    <a-icon :type="props.menuInfo.icon"/>
    <span>{{ props.menuInfo.name }}</span>
  </span>
  <template v-for="item in props.menuInfo.children">
    <a-menu-item v-if="!item.children || item.children.length === 0" :key="item.id">
      <a-icon :type="item.icon"/>
      <span>{{ item.name }}</span>
    </a-menu-item>
    <sub-menu v-else :key="item.id" :menu-info="item"/>
  </template>
</a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
