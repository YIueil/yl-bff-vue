<template>
  <div class="sider-content">
    <div class="logoWrapper" :class="{'logoWrapper': true, 'dark': theme === 'dark'}">
      <img src="@/assets/svg/logo.svg" alt=""/>
      <h1 v-show="!collapsed && !isMobile">Access Control Center</h1>
    </div>
    <a-menu
      :mode="isMobile ? 'vertical' : 'inline'"
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
</template>

<script>
import { mapGetters } from 'vuex'
import SubMenu from '@/components/Menu/SubMenu'

export default {
  name: 'CommonSider',
  components: { SubMenu },
  props: {
    theme: {
      type: String,
      default: () => {
        return 'dark'
      }
    },
    collapsed: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      current: [],
      openKeys: []
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'menuList'])
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val)
    }
  },
  methods: {
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
.logoWrapper {
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-bottom: 1px solid #F0F2F5;
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

.dark {
  background: #001529;
  border-bottom: 2px solid #001529;

  h1 {
    color: #fffdfd;
    width: 100%;
  }
}

.hideText {
  .menu-text {
    display: none;
  }
}
</style>
