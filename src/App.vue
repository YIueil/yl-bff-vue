<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>
