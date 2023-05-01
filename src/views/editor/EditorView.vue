<template>
  <div>
    <milk-down-editor
        ref="editor"
        :mark-down-text="markDownText"
        :editable="editable"
        :default-theme="$vuetify.theme.dark ? 'dark' : 'light'"
        @markdownUpdated="onMarkdownUpdated"
    />
  </div>
</template>

<script>
import _ from 'loadsh'
import MilkDownEditor from '@/components/editor/MilkDownEditor'
import pageApi from '@/api/page'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'EditorView',
  components: { MilkDownEditor },
  props: ['pageId'],
  data() {
    return {
      page: {},
      markDownText: 'hello world!',
      isSaving: null,
      editable: true
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
      this.$store.commit('SET_CURRECT_PAGE', this.page)
      this.markDownText = this.currectPage.content
      this.editable = this.currectPage.editable
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
  computed: {
    ...mapState({
      currectPage: state => state.page.currectPage
    })
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
    },
    '$store.state.page.currectPage.editable': function() {
      this.editable = this.$store.state.page.currectPage.editable
    }
  }
}
</script>

<style scoped>

</style>
