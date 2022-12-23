<template>
  <div>
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
          <v-list-item-icon>
            <v-menu
                top
                fixed
                min-width="256"
                :close-on-click="true"
                :offset-y="true"
                :offset-x="true">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>工作空间</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider inset></v-divider>
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
                <v-divider inset></v-divider>
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-logout-variant</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>退出登录</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-icon>
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
        <v-treeview
            dense
            hoverable
            activatable
            :items="pageList"
            @update:active="onActivated"
        ></v-treeview>
      </template>
      <template #sider-append>
        <div class="pa-2">
          <v-btn @click="newPage" small block>⚡ New page</v-btn>
        </div>
      </template>
      <template #main>
        <router-view/>
      </template>
    </y-sandbox>
  </div>
</template>

<script>
import pageApi from '@/api/page'
import YSandbox from '@/components/application/YSandbox'
import { mapState, mapActions } from 'vuex'

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
      activityPageId: 0,
      right: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['initPageList']),
    init() {
      this.initPageList()
    },
    onActivated(page) {
      if (page[0]) {
        this.activityPageId = page[0]
        this.$router.push({
          name: 'page',
          params: {
            pageId: page[0]
          },
          query: {
            readOnly: true
          }
        })
      } else {
        this.activityPageId = 0
      }
    },
    async newPage() {
      await pageApi.addPage({
        title: 'New page',
        content: 'New page',
        parentId: this.activityPageId
      })
      await this.initPageList()
    }
  },
  computed: {
    ...mapState({
      pageList: state => state.page.pageList
    })
  }
}
</script>

<style scoped>

</style>
