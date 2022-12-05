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
      <template #sider>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://s2.loli.net/2022/05/10/6NZgpvlQx8PBG3o.png" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              YIueil
            </v-list-item-title>
            <v-list-item-subtitle>
              默认空间
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list
            dense
            nav
        >
          <v-list-item
              v-for="item in items"
              :key="item.title"
              link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
  data() {
    return {
      items: [
        { title: '快速查找', icon: 'mdi-magnify' },
        { title: '导入', icon: 'mdi-upload' },
        { title: '删除', icon: 'mdi-delete' }
      ],
      right: null
    }
  }
}
</script>
<style lang="less">
html {
  overflow-y: auto;
}
</style>
