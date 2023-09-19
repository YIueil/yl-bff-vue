<template>
  <div>
    <a-space>
      <div>
        <a-button type="primary">按钮</a-button>
      </div>
      <div>
        <a-affix :offset-top="top">
          <a-button type="primary" @click="top += 10">
            Affix top
          </a-button>
        </a-affix>
        <br/>
        <a-affix :offset-bottom="bottom">
          <a-button type="primary" @click="bottom += 10">
            Affix bottom
          </a-button>
        </a-affix>
      </div>
      <div>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            Hover me <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown-button @click="handleButtonClick">
          Dropdown
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="user"/>
              1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="user"/>
              2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="user"/>
              3rd item
            </a-menu-item>
          </a-menu>
        </a-dropdown-button>
        <a-dropdown-button>
          Dropdown
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="user"/>
              1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="user"/>
              2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="user"/>
              3rd item
            </a-menu-item>
          </a-menu>
          <a-icon slot="icon" type="user"/>
        </a-dropdown-button>
        <a-dropdown-button disabled style="margin-left: 8px" @click="handleButtonClick">
          Dropdown
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="user"/>
              1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="user"/>
              2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="user"/>
              3rd item
            </a-menu-item>
          </a-menu>
        </a-dropdown-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="user"/>
              1st menu item
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="user"/>
              2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="user"/>
              3rd item
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> Button
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </div>
      <div style="width: 256px">
        <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <a-menu
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          mode="inline"
          :inline-collapsed="collapsed"
        >
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>Option 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>Option 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="inbox" />
            <span>Option 3</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
            <a-menu-item key="5">
              Option 5
            </a-menu-item>
            <a-menu-item key="6">
              Option 6
            </a-menu-item>
            <a-menu-item key="7">
              Option 7
            </a-menu-item>
            <a-menu-item key="8">
              Option 8
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
            <a-menu-item key="9">
              Option 9
            </a-menu-item>
            <a-menu-item key="10">
              Option 10
            </a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="11">
                Option 11
              </a-menu-item>
              <a-menu-item key="12">
                Option 12
              </a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu>
      </div>
      <div>
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="Title"
          sub-title="This is a subtitle"
          @back="() => null"
        />
      </div>
    </a-space>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/userService'

export default {
  name: 'TestComponent',
  components: {},
  props: {},
  data() {
    return {
      top: 10,
      bottom: 10,
      collapsed: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleButtonClick(e) {
      console.log('click left button', e)
    },
    handleMenuClick(e) {
      console.log('click', e)
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  },
  mounted() {
    getUserInfo().then(resp => {
      console.log(resp)
    })
  }
}
</script>

<style scoped>

</style>
