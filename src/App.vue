<template>
  <v-app>
    <y-sandbox>
      <template #main>
        <router-view />
      </template>
    </y-sandbox>
  </v-app>
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
