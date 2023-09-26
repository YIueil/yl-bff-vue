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
      <common-sider :collapsed="collapsed" :theme="theme"></common-sider>
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
        <router-view/>
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
      collapsed: false
    }
  },
  computed: {},
  methods: {
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
}
</style>
