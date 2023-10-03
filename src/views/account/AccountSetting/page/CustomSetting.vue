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
        <a-switch checkedChildren="暗色" unCheckedChildren="白色" :defaultChecked="theme === 'dark'"
                  @change="onThemeChange"/>
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

export default {
  name: 'CustomSetting',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['theme'])
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
