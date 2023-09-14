<template>
  <div id="wrapper">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/Login">Login</router-link>
    </nav>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
  },
  methods: {}
}
</script>

<style lang="less">
#wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#app {
  flex-grow: 1;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
