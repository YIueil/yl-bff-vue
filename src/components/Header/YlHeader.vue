<template>
  <div class="header-content">
    <div class="header-left">
      <ModelList />
    </div>
    <div class="header-right">
      <AvatarDropdown />
    </div>
  </div>
</template>

<script>
import AvatarDropdown from '@/components/Header/AvatarDropdown/AvatarDropdown'
import ModelList from '@/components/Header/ModelList/ModelList'
export default {
  name: 'YlHeader',
  components: { ModelList, AvatarDropdown },
  props: {},
  data() {
    return {
      currentModel: 'ACC'
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
