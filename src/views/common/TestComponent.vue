<template>
  <div>

  </div>
</template>

<script>
import { getUserInfo } from '@/api/userService'

export default {
  name: 'TestComponent',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    getUserInfo().then(resp => {
      console.log(resp)
    })
  }
}
</script>

<style scoped>

</style>
