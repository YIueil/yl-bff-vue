<template>
  <div>
    {{ mockStr }}
  </div>
</template>

<script>
import * as Mockjs from 'mockjs'


export default {
  name: 'TestComponent',
  components: {},
  props: {},
  data() {
    return {
      mockStr: '这里会展示一些随机生成的数据'
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    this.mockStr = Mockjs.mock({
      'string|1-10': '★'
    })
  }
}
</script>

<style scoped>

</style>
