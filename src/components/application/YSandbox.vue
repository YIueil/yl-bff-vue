<template>
  <v-app id="inspire">
    <v-app id="sandbox">
      <v-navigation-drawer
          v-model="drawer.model"
          :clipped="drawer.clipped"
          :floating="drawer.floating"
          :mini-variant="drawer.mini"
          :permanent="drawer.type === 'permanent'"
          :temporary="drawer.type === 'temporary'"
          overflow
          app
      >
        <slot name="sider"></slot>
      </v-navigation-drawer>
      <v-app-bar
          :clipped-left="drawer.clipped"
          app
      >
        <v-app-bar-nav-icon
            v-if="drawer.type !== 'permanent'"
            @click.stop="drawer.model = !drawer.model"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>YSandbox</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <slot name="main"></slot>
        </v-container>
      </v-main>
      <v-footer
          :inset="footer.inset"
          app
      >
        <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'YSandbox',
  props: {
    source: String
  },
  computed: {
    ...mapState({
      drawer: state => state.drawer,
      footer: state => state.footer
    })
  }
}
</script>

<style scoped>

</style>

