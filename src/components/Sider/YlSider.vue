<template>
  <div class="sider-content">
    <div class="logoWrapper" :class="{'logoWrapper': true, 'dark': theme === 'dark'}">
      <img src="@/assets/svg/logo.svg" alt=""/>
      <h1 v-show="!collapsed && !isMobile">Access Control Center</h1>
    </div>
    <a-menu
      :default-selected-keys="['1']"
      :open-keys.sync="openKeys"
      :mode="isMobile ? 'vertical' : 'inline'"
      :theme="theme"
      @click="handleClick"
    >
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <span :class="{ 'hideText' : isMobile }" slot="title">
          <a-icon type="mail"/>
          <span class="menu-text">Navigation One</span>
        </span>
        <a-menu-item-group key="g1">
          <template slot="title">
            <a-icon type="qq"/>
            <span class="menu-text">Item 1</span>
          </template>
          <a-menu-item key="1">
            Option 1
          </a-menu-item>
          <a-menu-item key="2">
            Option 2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group key="g2" title="Item 2">
          <a-menu-item key="3">
            Option 3
          </a-menu-item>
          <a-menu-item key="4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub2" @titleClick="titleClick">
        <span :class="{ 'hideText' : isMobile }" slot="title">
          <a-icon type="appstore"/>
          <span class="menu-text">Navigation Two</span>
        </span>
        <a-menu-item key="5">
          Option 5
        </a-menu-item>
        <a-menu-item key="6">
          Option 6
        </a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span :class="{ 'hideText' : isMobile }" slot="title">
          <a-icon type="setting"/>
          <span class="menu-text">Navigation Three</span>
        </span>
        <a-menu-item key="9">
          Option 9
        </a-menu-item>
        <a-menu-item key="10">
          Option 10
        </a-menu-item>
        <a-menu-item key="11">
          Option 11
        </a-menu-item>
        <a-menu-item key="12">
          Option 12
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'YlSider',
  components: {},
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
    ...mapGetters(['isMobile'])
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
