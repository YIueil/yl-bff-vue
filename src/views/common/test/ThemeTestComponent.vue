<template>
  <div class="renderBox">
    <a-menu
      style="width: 256px"
      :default-selected-keys="['1']"
      :open-keys.sync="openKeys"
      mode="inline"
      @click="handleClick"
    >
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
        <a-menu-item-group key="g1">
          <template slot="title"> <a-icon type="qq" /><span>Item 1</span> </template>
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
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
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
        <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
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
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="主题">
        <a-space>
          <div class="colorSpan" v-for="color in colorList" :key="color.key" @click="changeTheme(color)" :style="{backgroundColor: color.color}"></div>
        </a-space>
      </a-form-item>
      <a-form-item label="数字输入">
        <a-input placeholder="Basic usage"/>
        <a style="display: inline">链接文字</a>
      </a-form-item>
      <a-form-item label="开关">
        <a-switch default-checked/>
      </a-form-item>
      <a-form-item label="滑动输入条">
        <a-slider :default-value="30"/>
      </a-form-item>
      <a-form-item label="选择器">
        <a-radio-group>
          <a-radio-button value="large">
            Large
          </a-radio-button>
          <a-radio-button value="default">
            Default
          </a-radio-button>
          <a-radio-button value="small">
            Small
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="日期选择框">
        <a-date-picker/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-space>
          <a-button type="primary">
            Primary
          </a-button>
          <a-button>Default</a-button>
          <a-button type="dashed">
            Dashed
          </a-button>
          <a-button type="danger">
            Danger
          </a-button>
          <a-button type="link">
            Link
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import themeUtils from '@/utils/themeUtils'
export default {
  name: 'FormTestComponent',
  components: {},
  props: {},
  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1'],
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
  computed: {},
  watch: {
    openKeys(val) {
      console.log('openKeys', val)
    }
  },
  methods: {
    changeTheme(themeObj) {
      console.log(themeObj)
      themeUtils.changeColor(themeObj.color).finally(() => {
        setTimeout(() => {
          console.log('完成皮肤切换')
        }, 10)
      })
    },
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

<style scoped>
.renderBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.colorSpan {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
