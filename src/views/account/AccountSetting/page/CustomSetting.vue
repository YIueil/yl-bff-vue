<template>
  <a-list itemLayout="horizontal">
    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>启用标签页</a>
        </template>
        <template v-slot:description>
          <span>
            标签页修改
          </span>
        </template>
      </a-list-item-meta>
      <template v-slot:actions>
        <a-switch :default-checked="useTabsMode" @change="onUseTabsChange"/>
      </template>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>页面布局</a>
        </template>
        <template v-slot:description>
          <span>
            整体布局修改
          </span>
        </template>
      </a-list-item-meta>
      <template v-slot:actions>
        <a-space class="layout-list">
          <LayoutButton layout-type="basicLayout" @click.native="onChangeLayout(true, true)"/>
          <LayoutButton layout-type="basicLayout" @click.native="onChangeLayout(true, false)" :has-footer="false"/>
          <LayoutButton layout-type="basicLayout" @click.native="onChangeLayout(false, true)" :has-sider="false"/>
          <LayoutButton layout-type="basicLayout" @click.native="onChangeLayout(false, false)" :has-footer="false" :has-sider="false"/>
        </a-space>
      </template>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>主题色</a>
        </template>
        <template v-slot:description>
          <span>
            主题配色修改
          </span>
        </template>
      </a-list-item-meta>
      <template v-slot:actions>
        <a-tooltip class="color-list" v-for="(item, index) in colorList" :key="index">
          <template slot="title">
            {{ item.key }}
          </template>
          <a-tag :color="item.color" @click="changeColor(item.color)">
            <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
          </a-tag>
        </a-tooltip>
      </template>
    </a-list-item>
  </a-list>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import LayoutButton from '@/views/account/AccountSetting/page/LayoutButton/LayoutButton.vue'

export default {
  name: 'CustomSetting',
  components: { LayoutButton },
  props: {},
  data() {
    return {
      colorList: [
        {
          key: '薄暮', color: '#F5222D'
        },
        {
          key: '火山', color: '#FA541C'
        },
        {
          key: '日暮', color: '#FAAD14'
        },
        {
          key: '明青', color: '#13C2C2'
        },
        {
          key: '极光绿', color: '#52C41A'
        },
        {
          key: '拂晓蓝（默认）', color: '#1890FF'
        },
        {
          key: '极客蓝', color: '#2F54EB'
        },
        {
          key: '酱紫', color: '#722ED1'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      primaryColor: state => state.app.primaryColor,
      useTabsMode: state => state.app.useTabsMode
    })
  },
  watch: {},
  methods: {
    ...mapActions(['setTabsMode', 'changeShowSider', 'changeShowFooter', 'changePrimaryColor']),
    colorFilter(color) {
      console.log(color)
    },
    changeColor(color) {
      if (this.primaryColor !== color) {
        this.changePrimaryColor({ primaryColor: color, isStorage: true })
      }
    },
    onUseTabsChange(checked) {
      this.setTabsMode({ useTabs: checked, isStorage: true })
    },
    onChangeLayout(showSider, showFooter) {
      this.changeShowSider({ showSider, isStorage: true })
      this.changeShowFooter({ showFooter, isStorage: true })
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.layout-list {
  display: flex;
}

.color-list {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
  margin-right: 8px;
  padding-left: 0;
  padding-right: 0;
  text-align: center;
  color: #fff;
  font-weight: 700;

  i {
    font-size: 14px;
  }
}
</style>
