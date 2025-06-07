<template>
  <div class="header-content">
    <div class="header-left">
      <div v-if="!showSider" class="logoWrapper" :class="{'logoWrapper': true, 'dark': theme === 'dark'}">
        <img src="@/assets/svg/logo.svg" alt=""/>
        <h1 v-show="!isMobile">Access Control Center</h1>
      </div>

      <ModelList v-if="showSider"/>
      <a-menu
          mode="horizontal"
          v-else
          :theme="theme"
          :default-selected-keys="['1']"
          :default-open-keys="['2']"
          @click="onMenuClick"
      >
        <template v-for="menu in menuList">
          <a-menu-item v-if="!menu.children || menuList.length === 0" :value="menu" :key="menu.id">
            <a-icon :type="menu.icon"/>
            <span>{{ menu.name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="menu.id" :menu-info="menu" :title-click="titleClick"/>
        </template>
      </a-menu>
    </div>
    <div class="header-right">
      <ModelList v-if="!showSider"/>
      <a-space>
        <a-space size="middle" class="right-buttons">
          <span class="iconfont yl-icon-i18n hover-shadow-circle-after font-size-24px"/>
          <span @click="onChangeTheme(theme === 'dark' ? 'light': 'dark', true)" :class="{iconfont: true, 'hover-shadow-circle-after': true, 'font-size-24px': true, 'yl-icon-dark-mode': theme === 'dark', 'yl-icon-light-mode': theme === 'light' }"/>
        </a-space>
        <AvatarDropdown/>
      </a-space>
    </div>
  </div>
</template>

<script>
import AvatarDropdown from '@/components/Header/AvatarDropdown/AvatarDropdown'
import ModelList from '@/components/Header/ModelList/ModelList'
import SubMenu from '@/components/Menu/SubMenu'
import { mapGetters, mapActions } from 'vuex'
import { appMixin } from '@/store/mixin/app-mixin'

export default {
  name: 'CommonHeader',
  mixins: [appMixin],
  components: { ModelList, AvatarDropdown, SubMenu },
  props: {},
  data() {
    return {
      currentModel: 'ACC'
    }
  },
  computed: {
    ...mapGetters(['theme', 'menuList'])
  },
  watch: {},
  methods: {
    ...mapActions(['changeTheme']),
    onChangeTheme(theme, isStorage) {
      this.changeTheme({
        theme,
        isStorage
      })
    },
    onMenuClick({ item: { value, value: { router } }, key, keyPath }) {
      console.log(router, key, keyPath)
      this.$emit('menuClick', value)
    },
    titleClick({ key, domEvent }) {
      console.log('菜单点击', key, domEvent)
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
  .ant-menu-horizontal {
    line-height: 62px;
  }
  .header-left {
    display: flex;
    .logoWrapper {
      height: 64px;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      justify-content: center;
      padding: 5px;

      img {
        height: 48px;
        width: 48px;
        display: inline-block;
      }

      h1 {
        width: 100%;
      }
    }
  }

  .header-right {
    display: flex;
    .right-buttons {
      font-size: 24px;
    }
  }
}
</style>
