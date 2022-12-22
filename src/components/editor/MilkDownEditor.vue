<template>
  <div ref="editor"></div>
</template>

<script>
import {
  Editor,
  rootCtx,
  defaultValueCtx,
  themeManagerCtx,
  editorViewOptionsCtx
} from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { gfm } from '@milkdown/preset-gfm'
import { listener } from '@milkdown/plugin-listener' // 内容监听

import { history } from '@milkdown/plugin-history' // 撤销和重做支持
import { clipboard } from '@milkdown/plugin-clipboard' // 剪切板增强
import { indent } from '@milkdown/plugin-indent' // 缩进支持
import { slash, slashPlugin, createDropdownItem, defaultActions } from '@milkdown/plugin-slash' // 斜杠命令支持
import { block } from '@milkdown/plugin-block' // 块选择支持
import { prism } from '@milkdown/plugin-prism' // 代码高亮支持 依赖 prism-themes

export default {
  name: 'MilkDownEditor',
  props: {
    markDownText: {
      type: String,
      default: () => 'hello world!'
    },
    readOnly: {
      type: Boolean,
      default: () => false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const editable = () => this.readonly
      this.editor = await Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, this.$refs.editor)
          ctx.set(defaultValueCtx, this.markDownText) // 初始化内容
          ctx.set(editorViewOptionsCtx, {
            editable
          }) // 是否可编辑
        })
        .use(gfm)
        .use(listener)
        .use(history)
        .use(clipboard)
        .use(indent)
        .use(nord)
        .use(block)
        .use(slash.configure(slashPlugin, {
          config: (ctx) => {
            return ({ content, isTopLevel }) => {
              if (!isTopLevel) return null
              const mapActions = (action) => {
                const { id = '' } = action
                switch (id) {
                case 'h1':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '一级标题',
                    'h1'
                  )
                  return action
                case 'h2':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '二级标题',
                    'h2'
                  )
                  return action
                case 'h3':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '三级标题',
                    'h3'
                  )
                  return action
                case 'bulletList':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '无序列表',
                    'bulletList'
                  )
                  return action
                case 'orderedList':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '有序列表',
                    'orderedList'
                  )
                  return action
                case 'taskList':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '待办列表',
                    'taskList'
                  )
                  return action
                case 'table':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '表格',
                    'table'
                  )
                  return action
                case 'image':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '图片',
                    'image'
                  )
                  return action
                case 'blockquote':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '引用',
                    'quote'
                  )
                  return action
                case 'code':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '代码块',
                    'code'
                  )
                  return action
                case 'divider':
                  action.dom = createDropdownItem(
                    ctx.get(themeManagerCtx),
                    '分割线',
                    'divider'
                  )
                  return action
                default:
                  return action
                }
              }
              if (content.startsWith('/')) {
                return content === '/'
                  ? {
                    placeholder: '<(￣︶￣)↗[GO!]',
                    actions: defaultActions(ctx).map(mapActions)
                  }
                  : {
                    actions: defaultActions(ctx, content).map(mapActions)
                  }
              }
              return null
            }
          }
        }))
        .use(prism)
        .create()
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep(.milkdown) {
  .editor {
    padding: 30px;
    .h1 {
      font-size: 24px;
    }
    .h2 {
      font-size: 20px;
    }
    .h3 {
      font-size: 18px;
    }
    .h4 {
      font-size: 16px;
    }
    .h5 {
      font-size: 16px;
    }
    .h6 {
      font-size: 16px;
    }
  }
}
</style>
