<template>
  <div id="app">
    <span class="iconfont">&#xe66b;</span>
    <span class="iconfont yl-icon-image"></span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#yl-icon-image"></use>
    </svg>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {},
  methods: {
    ...mapActions(['initUser'])
  }
}
</script>

<style lang="less">
html body {
  margin: 0;
  padding: 0;
  border: 0;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
