<template>
  <a-list itemLayout="horizontal">
    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>风格配色</a>
        </template>
        <template v-slot:description>
          <span>
            整体风格配色设置
          </span>
        </template>
      </a-list-item-meta>
      <template v-slot:actions>
        <LayoutButton layout-type="basicLayout" />
        <LayoutButton layout-type="basicLayout" :has-footer="false" />
        <LayoutButton layout-type="basicLayout" :has-sider="false" />
        <LayoutButton layout-type="noSideLayout" :has-footer="false" :has-sider="false"/>
      </template>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>主题色</a>
        </template>
        <template v-slot:description>
          <span>
            页面风格配色： <a>{{ colorFilter(primaryColor) }}</a>
          </span>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>

import { mapState } from 'vuex'
import LayoutButton from '@/views/account/AccountSetting/page/LayoutButton.vue'

export default {
  name: 'CustomSetting',
  components: { LayoutButton },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['theme', 'primaryColor'])
  },
  watch: {},
  methods: {
    colorFilter(color) {
      console.log(color)
    },
    onThemeChange(checked) {
      console.log(checked)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
