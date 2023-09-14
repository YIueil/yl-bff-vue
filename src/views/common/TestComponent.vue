<template>
  <div>
    <span class="iconfont">&#xe66b;</span>
    <span class="iconfont yl-icon-image"></span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#yl-icon-image"></use>
    </svg>
    {{ 1223445 | NumberFormat }} <br/>
    {{ 2223333 | NumberFormat }} <br/>

    {{ new Date() | dayjs }} <br/>
    {{ new Date() | moment }} <br/>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>
