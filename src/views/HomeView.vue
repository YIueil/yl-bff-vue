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
                    <v-list-item-title>
                      工作空间
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-btn icon @click="spaceDialog = true">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item
                    v-for="item in spaceList"
                    :key="item.title"
                    link
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
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
                        <v-list-item @click="editSpace(item)" link>
                          <v-list-item-icon>
                            <v-icon>mdi-edit</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>编辑</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="deleteSpace(item)" link>
                          <v-list-item-icon>
                            <v-icon>mdi-delete</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>删除</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-icon>
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
              @click="item.cb"
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
        <v-snackbar
            v-model="snackbar"
            :top="true"
        >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              关闭
            </v-btn>
          </template>
        </v-snackbar>
      </template>
    </y-sandbox>
    <v-dialog width="400" v-model="spaceDialog">
      <v-form ref="form" v-model="spaceValid" :lazy-validation="false">
        <v-card>
          <v-card-title>
            <span class="headline">新增命名空间</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="pa-5">
                <v-col cols="12" sm="4" md="4">
                  <v-avatar  color="indigo">
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field v-model="space.name" :rules="spaceNameRules" label="空间名称" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="spaceDialog = false">取消</v-btn>
            <v-btn color="blue darken-1" text @click="addSpace" :disabled="!spaceValid">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import pageApi from '@/api/page'
import spaceApi from '@/api/space'
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
        { title: '快速查找', icon: 'mdi-magnify', cb: this.deletePage },
        { title: '导入', icon: 'mdi-upload', cb: this.deletePage },
        { title: '删除', icon: 'mdi-delete', cb: this.deletePage }
      ],
      activityPageId: 0,
      right: null,
      space: {},
      spaceDialog: false,
      spaceNameRules: [
        v => !!v || '命名空间名称不能为空'
      ],
      spaceValid: false,
      snackbar: false,
      text: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['initPageList', 'initSpaceList']),
    init() {
      this.initPageList()
      this.initSpaceList()
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
    async addSpace() {
      if (this.space.id) {
        await spaceApi.updateSpace(this.space)
      } else {
        await spaceApi.addSpace(this.space)
      }
      await this.initSpaceList()
      this.$refs.form.reset()
      this.text = '新增成功'
      this.snackbar = true
      this.spaceDialog = false
    },
    editSpace(space) {
      this.space = space
      this.spaceDialog = true
    },
    async deleteSpace(space) {
      await spaceApi.deleteSpace(space.id)
      await this.initSpaceList()
      this.text = '删除成功'
      this.snackbar = true
    },
    async newPage() {
      await pageApi.addPage({
        title: 'New page',
        content: 'New page',
        parentId: this.activityPageId
      })
      await this.initPageList()
      this.text = '新增成功'
      this.snackbar = true
    },
    async deletePage() {
      await this.$router.push({
        name: 'home'
      })
      await pageApi.deletePage({
        id: this.activityPageId
      })
      this.activityPageId = 0
      await this.initPageList()
    }
  },
  computed: {
    ...mapState({
      pageList: state => state.page.pageList,
      spaceList: state => state.space.spaceList
    })
  }
}
</script>

<style scoped>

</style>
