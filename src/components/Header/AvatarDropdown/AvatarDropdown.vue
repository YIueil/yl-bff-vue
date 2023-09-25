<template>
  <a-dropdown placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                class="antd-pro-global-header-index-avatar"/>
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user"/>
          个人信息
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting"/>
          个人设置
        </a-menu-item>
        <a-menu-divider v-if="menu"/>
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout"/>
          退出登陆
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => {
        return {
          name: 'YIueil'
        }
      }
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter() {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings() {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout(e) {
      console.log(e)
      Modal.confirm({
        title: '注销',
        content: '确认注销账号?',
        onOk: () => {
        },
        onCancel() {
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-account-avatar {
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  transition: all .3s;
  .antd-pro-global-header-index-avatar {
    margin: 2px;
  }
}
.ant-pro-drop-down {
  :deep(.action) {
    margin-right: 8px;
  }

  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
