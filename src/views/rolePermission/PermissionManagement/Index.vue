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
      <div class="origin">
        <a-space style="width: 100%; height: 100%" direction="vertical">
          <a-upload :before-upload="(file) => importText(file, 'origin')" :show-upload-list="false" accept=".txt,.text" style="margin-bottom: 10px">
            <a-button size="small" type="primary">导入</a-button>
          </a-upload>
          <a-textarea placeholder="原文本内容" :rows="30" v-model="originText" @change="changed"/>
        </a-space>
      </div>

      <div class="target">
        <a-space style="width: 100%; height: 100%" direction="vertical">
          <a-upload :before-upload="(file) => importText(file, 'target')" :show-upload-list="false" accept=".txt,.text" style="margin-bottom: 10px">
            <a-button size="small" type="primary">导入</a-button>
          </a-upload>
          <a-textarea placeholder="目标文本内容" :rows="30" v-model="targetText" @change="changed"/>
        </a-space>
      </div>
      <div class="result">
        统计结果:
        {{ getDiffStats() }}
        <pre ref="result"></pre>
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
    importText(file, type) {
      return new Promise((resolve, reject) => {
        const _this = this
        const reader = new FileReader()

        reader.onload = (event) => {
          const content = event.target.result
          if (type === 'origin') {
            this.originText = content
          } else {
            this.targetText = content
          }
          this.$nextTick(() => {
            _this.changed() // 自动触发对比
          })
          resolve(false) // 阻止默认上传行为
        }

        reader.onerror = (error) => {
          this.$message.error('文件读取失败')
          reject(error)
        }

        reader.readAsText(file)
      }).catch(error => {
        console.error('文件上传错误:', error)
        return false
      })
    },
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
