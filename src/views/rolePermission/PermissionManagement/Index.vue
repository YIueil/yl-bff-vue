<template>
  <div class="permission-manager">
    <div id="setting" class="setting">
      <a-radio-group v-model="diffType" @change="onDiffTypeChange">
        <a-radio value="diffChars">
          字符对比
        </a-radio>
        <a-radio value="diffLines">
          行对比
        </a-radio>
        <a-radio value="diffPatch">
          总结对比
        </a-radio>
      </a-radio-group>
    </div>
    <div class="diff-content">
      <a-textarea class="origin" placeholder="原文本内容" :rows="4" v-model="originText" @change="changed"/>
      <a-textarea class="target" placeholder="目标文本内容" :rows="4" v-model="targetText" @change="changed"/>
      <div class="result">
        统计结果:
        {{ getDiffStats() }}
        <pre id="result" class="result" ref="result"></pre>
      </div>

    </div>
  </div>
</template>

<script>
import * as Diff from 'diff'

export default {
  name: 'PermissionManagement',
  data() {
    return {
      diffType: 'diffChars',
      originText: '',
      targetText: ''
    }
  },
  methods: {
    getDiffStats() {
      const lineDiffs = Diff.diffLines(this.originText, this.targetText)

      let addedLines = 0
      let removedLines = 0

      lineDiffs.forEach(part => {
        if (part.added) {
          addedLines += part.count || part.value.split('\n').length - 1
        }
        if (part.removed) {
          removedLines += part.count || part.value.split('\n').length - 1
        }
      })

      return `新增行数: ${ addedLines }, 删除行数: ${ removedLines }`
    },
    changed() {
      const fragment = document.createDocumentFragment()
      let diff
      if (this.diffType === 'diffPatch') {
        let pastHunkHeader = false
        diff = Diff.createTwoFilesPatch('origin.txt', 'target.txt', this.originText, this.targetText).split('\n').map((entry) => {
          const result = {
            value: entry + '\n'
          }
          if (entry.startsWith('@@')) {
            result.chunkHeader = true
            pastHunkHeader = true
          } else if (pastHunkHeader) {
            if (entry.startsWith('-')) {
              result.removed = true
            } else if (entry.startsWith('+')) {
              result.added = true
            }
          }
          return result
        })
      } else {
        diff = Diff[this.diffType](this.originText, this.targetText)
      }
      for (let i = 0; i < diff.length; i++) {
        if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
          const swap = diff[i]
          diff[i] = diff[i + 1]
          diff[i + 1] = swap
        }

        let node
        if (diff[i].value.includes('No newline at end of file')) {
          continue
        }
        if (diff[i].removed) {
          node = document.createElement('del')
          node.appendChild(document.createTextNode(diff[i].value))
        } else if (diff[i].added) {
          node = document.createElement('ins')
          node.appendChild(document.createTextNode(diff[i].value))
        } else if (diff[i].chunkHeader) {
          node = document.createElement('span')
          node.setAttribute('class', 'chunk-header')
          node.appendChild(document.createTextNode(diff[i].value))
        } else {
          node = document.createTextNode(diff[i].value)
        }
        fragment.appendChild(node)
      }

      this.$refs.result.textContent = ''
      this.$refs.result.appendChild(fragment)
    },
    onDiffTypeChange(e) {
      console.log('radio checked', e.target.value)
      this.changed()
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.permission-manager {
  display: flex;
  flex-direction: column;

  height: 100%;
  .setting {
    flex: 0;
  }
  .diff-content {
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 100%;
    .origin {
      flex: 1;
      height: 100%;
    }

    .target {
      flex: 1;
      height: 100%;
    }

    .result {
      flex: 1;
      height: 100%;
    }
  }
}


/deep/ del {
  text-decoration: none;
  color: #b30000;
  background: #fadad7;
}

/deep/ ins {
  background: #eaf2c2;
  color: #406619;
  text-decoration: none;
}

</style>
