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
    >
      <template v-for="menu in menuList">
        <a-menu-item v-if="!menu.children || menuList.length === 0" :key="menu.id">
          <a-icon :type="menu.icon"/>
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="menu.id" :menu-info="menu"/>
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
    handleClick(e) {
      console.log('click', e)
    },
    titleClick(e) {
      console.log('titleClick', e)
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
  border-bottom: 2px solid #F0F2F5;
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
  background: #25273b;
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
