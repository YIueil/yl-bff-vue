<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view />
  </div>
</template>

<script>

import YSandbox from '@/components/application/YSandbox'
export default {
  name: 'App',
  components: { YSandbox },
  data: () => ({
    //
  }),
};
</script>
