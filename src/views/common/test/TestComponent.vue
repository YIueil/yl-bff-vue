<template>
  <div>
    <custom-header-table
        :data-source="tableData"
        :columns="tableColumns"
        @columns-change="handleColumnsChange"
    >
      <span slot="operate" slot-scope="{ text, record }">
        <a-button @click="editRecord(text, record)">编辑</a-button>
      </span>
    </custom-header-table>
  </div>
</template>

<script>
import CustomHeaderTable from '@/components/Table/DHTable/DynamicHeaderTable'

export default {
  name: 'TestComponent',
  components: {
    CustomHeaderTable
  },
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, address: '北京市朝阳区', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', age: 30, address: '上海市浦东新区', email: 'lisi@example.com' },
        { id: 3, name: '王五', age: 28, address: '广州市天河区', email: 'wangwu@example.com' }
      ],
      tableColumns: [
        { title: '姓名', dataIndex: 'name', key: 'name', fieldGroup: '业务' },
        { title: '年龄', dataIndex: 'age', key: 'age', fieldGroup: '业务' },
        { title: '地址', dataIndex: 'address', key: 'address', fieldGroup: '隐私' },
        { title: '邮箱', dataIndex: 'email', key: 'email', fieldGroup: '隐私' },
        { title: '操作', dataIndex: 'operate', key: 'operate', fieldGroup: '其他', scopedSlots: { customRender: 'operate' }  }
      ],
      cols: [
        { title: '姓名', dataIndex: 'name', key: 'name', fieldGroup: '业务' },
        { title: '操作', dataIndex: 'operate', key: 'operate', fieldGroup: '其他', scopedSlots: { customRender: 'operate' }  }
      ]
    }
  },
  methods: {
    handleColumnsChange(newColumns) {
      console.log('列配置已更新:', newColumns)
      // 可以在这里保存用户自定义的列配置
    },
    editRecord(text, record) {
      console.log('编辑行', text, record)
    }
  }
}
</script>
