<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="less">
html body{
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
