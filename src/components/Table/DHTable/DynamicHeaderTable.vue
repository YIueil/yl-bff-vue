<template>
  <div class="custom-table-container">
    <a-button type="primary" @click="showModal">编辑表头</a-button>

    <a-table
        :columns="visibleColumns"
        :data-source="tableData"
        :row-key="record => record.id"
        bordered
    >
      <!-- 传递所有插槽到 a-table -->
      <template v-for="(_, slot) in $scopedSlots" :slot="slot" slot-scope="text, record">
        <slot :name="slot" v-bind="{ text, record }"></slot>
      </template>
    </a-table>

    <a-modal
        title="编辑表头"
        :visible="modalVisible"
        @ok="handleOk"
        @cancel="handleCancel"
        width="600px"
    >
      <div class="column-editor">
        <div class="column-list">
          <a-collapse :activeKey="groupColumns.map(item => item.groupName)" :bordered="false">
            <a-collapse-panel
                v-for="group in groupColumns"
                :key="group.groupName"
                :header="group.groupName"
            >
              <a-row :gutter="[16, 16]">
                <a-col :span="6" v-for="col in group.columns" :key="col.key || col.dataIndex">
                  <a-checkbox
                      v-model="col.visible"
                      @change="handleColumnChange"
                  >
                    {{ col.title }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'DynamicHeaderTable',
  inheritAttrs: false, // 防止属性继承到根元素
  components: {},
  props: {
    // 表格数据源
    dataSource: {
      type: Array,
      default: () => []
    },
    // 所有列配置
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      modalVisible: false,
      allColumns: [], // 所有列配置（包含可见性状态）
      groupColumns: [], // 列分组情况
      tableData: [] // 表格数据
    }
  },
  computed: {
    // 当前可见的列
    visibleColumns() {
      return this.allColumns.filter(col => col.visible).map(col => {
        // 返回列配置时排除visible, fieldGroup属性
        // eslint-disable-next-line no-unused-vars
        const { visible, fieldGroup, ...columnProps } = col
        return columnProps
      })
    }
  },
  watch: {
    // 监听外部传入的列配置变化
    columns: {
      immediate: true,
      handler(newColumns) {
        this.initColumns(newColumns)
      }
    },
    // 监听外部传入的数据源变化
    dataSource: {
      immediate: true,
      handler(newData) {
        this.tableData = newData
      }
    }
  },
  methods: {
    // 初始化列配置
    initColumns(columns) {
      this.allColumns = columns.map(col => {
        return {
          ...col,
          visible: col.visible !== false // 默认可见
        }
      })

      const groupMap = new Map()

      this.allColumns.forEach(col => {
        const groupName = col.fieldGroup || '其他' // 默认分组为"其他"
        if (!groupMap.has(groupName)) {
          groupMap.set(groupName, [])
        }
        groupMap.get(groupName).push(col)
      })

      // 转换为数组格式，方便模板渲染
      this.groupColumns = Array.from(groupMap).map(([groupName, cols]) => ({
        groupName,
        columns: cols
      }))
    },

    // 显示编辑表头模态框
    showModal() {
      this.modalVisible = true
    },

    // 确认编辑
    handleOk() {
      this.modalVisible = false
      this.$emit('columns-change', this.visibleColumns)
    },

    // 取消编辑
    handleCancel() {
      this.modalVisible = false
    },

    // 列可见性变化处理
    handleColumnChange() {
      // 可以在这里添加额外逻辑
    }
  },
  mounted() {
    for (const a in this.$scopedSlots) {
      console.log(a)
    }
  }
}
</script>

<style scoped>
.custom-table-container {
  padding: 20px;
}

.column-editor {
  margin-top: 20px;
}

.column-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 8px;
}

.column-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #fafafa;
  border-radius: 4px;
  transition: all 0.3s;
}

.column-item:hover {
  background-color: #f0f0f0;
}

.column-item:last-child {
  margin-bottom: 0;
}

.drag-handle {
  margin-left: auto;
  cursor: move;
}

.tips {
  margin-top: 16px;
}
</style>
