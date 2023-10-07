<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main" :class="{ 'mobile': isMobile }">
        <div class="account-settings-info-left">
          <a-menu
            :mode="isMobile ? 'horizontal' : 'inline'"
            :style="{ border: '0', width: isMobile ? '560px' : 'auto'}"
            :selectedKeys="selectedKeys"
            type="inner"
            @click="onSettingTabChange"
          >
            <a-menu-item v-for="settingPage in pages" :value="settingPage" :key="settingPage.name">
              {{ settingPage.name}}
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ selectedNode.name }}</span>
          </div>
          <component :is="selectedNode.component"/>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { appMixin } from '@/store/mixin/app-mixin'
import BasicSetting from '@/views/account/AccountSetting/page/BasicSetting'
import SecuritySetting from '@/views/account/AccountSetting/page/SecuritySetting'
import CustomSetting from '@/views/account/AccountSetting/page/CustomSetting'
import ProxySetting from '@/views/account/AccountSetting/page/ProxySetting'

export default {
  name: 'AccountSetting',
  mixins: [appMixin],
  components: {},
  props: {},
  data() {
    return {
      selectedKeys: [],
      selectedNode: {
        name: '基础设置',
        component: BasicSetting
      },
      pages: [{
        name: '基础设置',
        component: BasicSetting
      }, {
        name: '安全设置',
        component: SecuritySetting
      }, {
        name: '个性设置',
        component: CustomSetting
      }, {
        name: '代理设置',
        component: ProxySetting
      }]
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSettingTabChange({ item: { value }}){
      this.selectedNode = value
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }

    .account-settings-info-right {
      padding: 20px 40px;
    }
  }

  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, .85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }

    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
