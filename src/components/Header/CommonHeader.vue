<template>
  <div class="header-content">
    <div class="header-left">
      <ModelList/>
    </div>
    <div class="header-right">
      <a-space>
        <a-space size="middle" class="right-buttons">
          <span class="iconfont yl-icon-i18n hover-shadow-circle-after font-size-24px"/>
          <span @click="onChangeTheme" :class="{iconfont: true, 'hover-shadow-circle-after': true, 'font-size-24px': true, 'yl-icon-dark-mode': theme === 'dark', 'yl-icon-light-mode': theme === 'light' }"/>
        </a-space>
        <AvatarDropdown/>
      </a-space>
    </div>
  </div>
</template>

<script>
import AvatarDropdown from '@/components/Header/AvatarDropdown/AvatarDropdown'
import ModelList from '@/components/Header/ModelList/ModelList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommonHeader',
  components: { ModelList, AvatarDropdown },
  props: {},
  data() {
    return {
      currentModel: 'ACC'
    }
  },
  computed: {
    ...mapGetters(['theme'])
  },
  watch: {},
  methods: {
    ...mapActions(['changeTheme']),
    onChangeTheme() {
      this.changeTheme()
    }
  },
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
