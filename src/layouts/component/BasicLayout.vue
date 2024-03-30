<template>
  <a-layout class="layout-basic">
    <a-layout-sider
      class="basic-sider"
      v-if="showSider"
      v-model="collapsed"
      :theme="theme"
      :trigger="null"
      :collapsedWidth="isMobile ? 0 : 80"
      :width="isMobile ? 80 : 200"
      :collapsible="true">
      <!-- 侧边 -->
      <common-sider @menuClick="onMenuClick" :collapsed="collapsed" :theme="theme"></common-sider>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :class="{'lightBackground': theme === 'light'}" :theme="theme">
        <a-icon
          class="iconComponent"
          v-if="showSider"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsed = !collapsed"
        />
        <!--  头部  -->
        <common-header @menuClick="onMenuClick"></common-header>
      </a-layout-header>
      <a-layout-content class="basic-content">
        <!--  主体内容  -->
        <a-tabs
          type="editable-card"
          size="small"
          v-if="useTabs"
          v-show="panes.length > 0"
          :activeKey="activeKey"
          :hideAdd="true"
          :tabBarGutter="2"
          :tabBarStyle="tabBarStyle"
          :animated="false"
          @edit="onRemovePane"
          @change="onPaneChange">
          <template v-for="tab in panes">
            <a-tab-pane :key="tab.id" :tab="tab.name" :closable="true">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </a-tab-pane>
          </template>
        </a-tabs>
        <router-view v-else/>
      </a-layout-content>
      <a-layout-footer v-if="showFooter" class="basic-footer">
        <!-- 底部 -->
        <common-footer></common-footer>
      </a-layout-footer>
    </a-layout>
    <a-button class="globalSettingBtn" type="primary" shape="circle" icon="setting"
              @click="popApplicationSettingDialog"/>
  </a-layout>
</template>

<script>
import CommonHeader from '@/components/Header/CommonHeader'
import CommonSider from '@/components/Sider/CommonSider'
import CommonFooter from '@/components/Footer/CommonFooter'
import { appMixin } from '@/store/mixin/app-mixin'

export default {
  name: 'BasicLayout',
  mixins: [appMixin],
  components: { CommonFooter, CommonSider, CommonHeader },
  data() {
    return {
      // 收缩状态
      collapsed: false,
      // 页签
      panes: [],
      // 活动页签key
      activeKey: null,
      tabBarStyle: {
        margin: 0
      }
    }
  },
  computed: {},
  watch: {
    // 监听活动页面变化
    activeKey() {
      const findNode = this.panes.find(pane => pane.id === this.activeKey)
      if (findNode) {
        this.$router.push({ path: findNode.router.path })
      } else {
        // 最后一个标签被删除 返回首页
        this.$router.push({ path: '/' })
      }
    }
  },
  methods: {
    /**
     * 弹出设置
     */
    popApplicationSettingDialog() {
      this.$dialog(
        () => import('@/components/Setting/ApplicationSetting'),
        // component props
        {
          on: {
            ok() {
              console.log('ok 回调')
            },
            cancel() {
              console.log('cancel 回调')
            },
            close() {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '应用设置',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    /**
     * 按钮点击
     * @param menu
     */
    onMenuClick(menu) {
      if (this.panes.find(pane => pane.id === menu.id)) {
        this.onPaneChange(menu.id)
      } else {
        this.panes.push(menu)
        this.activeKey = menu.id
      }
    },
    /**
     * 切换tab pane页
     * @param activeKey
     */
    onPaneChange(activeKey) {
      this.activeKey = activeKey
    },
    /**
     * 移除pane
     * @param targetKey
     */
    onRemovePane(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.id === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.id !== targetKey)
      if (panes.length) {
        // 当前关闭的是当前活动页
        if (activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].id
          } else {
            activeKey = panes[0].id
          }
          this.activeKey = activeKey
        }
      } else {
        this.activeKey = null
      }
      this.panes = panes
    }
  }
}
</script>

<style scoped lang="less">
.layout-basic {
  .basic-sider{
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .basic-content {
    overflow: hidden
  }

  .basic-footer {
    background: #FFFFFF;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
}

.ant-layout-header {
  height: 64px;
  padding: 0;
  line-height: 64px;
  display: flex;
}

.globalSettingBtn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 48px;
  height: 48px;
  font-size: 24px;
  z-index: 9999;
}
</style>
