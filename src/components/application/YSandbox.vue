<template>
  <v-app id="sandbox">
    <v-navigation-drawer
        v-model="drawer.model"
        :clipped="drawer.clipped"
        :floating="drawer.floating"
        :mini-variant="drawer.mini"
        :permanent="drawer.type === 'permanent'"
        :temporary="drawer.type === 'temporary'"
        :width="computedWidth"
        overflow
        app
    >
      <slot name="sider"></slot>
      <div class="resize-line" @mousedown="onmousedown">
        <div class="line"></div>
      </div>
    </v-navigation-drawer>
    <v-app-bar
        :clipped-left="drawer.clipped"
        app
    >
      <v-app-bar-nav-icon
          v-if="drawer.type !== 'permanent'"
          @click.stop="drawer.model = !drawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="$router.push({ name: 'home' })">
        YSandbox
      </v-toolbar-title>
      <slot name="bar-left"></slot>
      <v-spacer></v-spacer>
      <slot name="bar-right"></slot>
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'YSandbox',
  props: {
    source: String
  },
  data() {
    return {
      initWidth: 256, // 初始宽度
      maxWidth: 500, // 最大宽度
      minWidth: 56, // 最小宽度
      computedWidth: this.initWidth // 计算结果宽度
    }
  },
  methods: {
    onmousedown() {
      const that = this
      // 当窗口发生变化时候更新宽高
      window.addEventListener('mousemove', that.resetSiderSize)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', that.resetSiderSize)
      })
    },
    resetSiderSize(event) {
      // 取消鼠标默认行为
      event.preventDefault()
      const offset = event.clientX - this.initWidth // 计算需要变化的偏移量
      this.computedWidth = this.initWidth + offset
      if (this.computedWidth > this.maxWidth) {
        this.computedWidth = this.maxWidth
      } else if (this.computedWidth < this.minWidth) {
        this.computedWidth = this.minWidth
      }
      console.log(this.computedWidth)
    }
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
.resize-line {
  position: absolute;
  right: 0;
  width: 0;
  flex-grow: 0;
  z-index: 1;
  top: 0;
  bottom: 0;
  pointer-events: auto;
}

.line {
  cursor: col-resize;
  height: 100%;
  width: 12px;
  margin-left: -6px;
}
</style>

