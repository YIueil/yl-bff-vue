<template>
  <a-layout class="layout-basic">
    <a-layout-sider
        v-model="collapsed"
        :theme="theme"
        :trigger="null"
        :collapsedWidth="isMobile ? 0 : 80"
        :width="isMobile ? 80 : 200"
        collapsible>
      <!-- 侧边 -->
      <common-sider @menuClick="onMenuClick" :collapsed="collapsed" :theme="theme"></common-sider>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :class="{'lightBackground': theme === 'light'}">
        <a-icon
            class="iconComponent"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
        />
        <!--  头部  -->
        <common-header></common-header>
      </a-layout-header>
      <a-layout-content>
        <!--  主体内容  -->
        <a-tabs type="editable-card" v-if="useTabsMode" v-show="panes.length > 0" :activeKey="activeKey" @edit="removePane">
          <template v-for="tab in panes">
            <a-tab-pane :key="tab.key" :tab="tab.title" :closable="true">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </a-tab-pane>
          </template>
        </a-tabs>
        <router-view v-else/>
      </a-layout-content>
      <a-layout-footer>
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
      // 使用tabs todo 后续使用全局settings注入
      useTabsMode: true,
      // 页签
      panes: [],
      // 活动页签key
      activeKey: ''
    }
  },
  computed: {},
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
      const { id, name, router } = menu
      if (this.panes.find(pane => pane.key === id)) {
        // 切换到
        this.activeKey = id
      } else {
        this.panes.push({
          key: id,
          title: name,
          router: router
        })
      }
    },
    /**
     * 移除pane
     * @param targetKey
     */
    removePane(targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    }
  }
}
</script>

<style scoped lang="less">
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
