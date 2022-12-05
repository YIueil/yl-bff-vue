<template>
  <div id="app">
    <y-sandbox>
      <template #bar-right>
        <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" icon>
          <v-icon v-if="$vuetify.theme.dark">mdi-brightness-1</v-icon>
          <v-icon v-else>mdi-brightness-2</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-lock</v-icon>
          <v-icon v-if="false">mdi-lock-open</v-icon>
        </v-btn>
        <v-btn @click="$router.push({ name: 'setting'})" icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <template #main>
        <router-view />
      </template>
    </y-sandbox>
  </div>
</template>

<script>
import YSandbox from '@/components/application/YSandbox'
export default {
  name: 'App',
  components: {
    YSandbox
  },
  data: () => ({
    //
  })
}
</script>
<style lang="less">
html {
  overflow-y: auto;
}
</style>
