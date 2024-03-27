<template>
  <div class="header-content">
    <div class="header-left">
      <ModelList/>
    </div>
    <div class="header-right">
      <a-space>
        <a-space size="middle" class="right-buttons">
          <IconFont class="hover-shadow-circle" type="yl-icon-i18n"/>
          <IconFont class="hover-shadow-circle" type="yl-icon-dark-mode"/>
          <IconFont class="hover-shadow-circle" type="yl-icon-light-mode"/>
        </a-space>
        <AvatarDropdown />
      </a-space>
    </div>
  </div>
</template>

<script>
import AvatarDropdown from '@/components/Header/AvatarDropdown/AvatarDropdown'
import ModelList from '@/components/Header/ModelList/ModelList'

export default {
  name: 'CommonHeader',
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

<style lang="less" scoped>
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  .header-right {
    .right-buttons {
      font-size: 24px;
    }
  }
}
</style>
