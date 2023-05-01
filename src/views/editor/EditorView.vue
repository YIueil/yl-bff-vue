<template>
  <div>
    <milk-down-editor
        ref="editor"
        :mark-down-text="markDownText"
        :read-only="true"
        @markdownUpdated="onMarkdownUpdated"
    />
  </div>
</template>

<script>
import _ from 'loadsh'
import MilkDownEditor from '@/components/editor/MilkDownEditor'
import pageApi from '@/api/page'
import { mapActions } from 'vuex'

export default {
  name: 'EditorView',
  components: { MilkDownEditor },
  props: ['pageId'],
  data() {
    return {
      page: {},
      markDownText: 'hello world!',
      isSaving: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(['initPageList']),
    async init() {
      this.page = await pageApi.getPage({
        id: this.pageId
      })
      this.markDownText = this.page.content
    },
    async onMarkdownUpdated(ctx, markdown) {
      if (!markdown) {
        return
      }
      this.page.title = markdown.slice(0, markdown.indexOf('\n')).replace('#', '').trim()
      this.page.content = markdown
      if (!this.isSaving) {
        this.isSaving = _.debounce(async() => {
          await this.savePage()
        }, 3000)
      }
      this.isSaving()
    },
    async savePage() {
      if (this.page.id) {
        await pageApi.updatePage({
          id: this.page.id
        }, this.page)
        await this.initPageList()
      } else {
        await pageApi.addPage(this.page)
        await this.initPageList()
      }
    }
  },
  watch: {
    pageId() {
      this.savePage()
      this.init()
    },
    markDownText() {
      this.$refs.editor.replaceAllText(this.markDownText)
    },
    '$vuetify.theme.dark': function(isDark) {
      this.$refs.editor.repalceTheme(isDark ? 'dark' : 'light')
    }
  }
}
</script>

<style scoped>

</style>
