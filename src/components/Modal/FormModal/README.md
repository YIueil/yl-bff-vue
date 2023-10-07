# 表单模态框
> 致力于实现弹出层的表单通过传入一个json实现渲染, 减少对于简单的表单的构造。
## 接受参数
| 参数 | 类型 | 是否必传 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| formId | String | 是 | - | 表单标识符 |
| visible | Boolean | 是 | - | 表单显示和隐藏 |
| title | String | 否 | 表单编辑 | 表单标题 |
| formItems | Array | 是 | - | 表单渲染内容: 支持文本框、数字框、选择框、日期选择框、单选框组、多选框组 |

## formItems参数详情API


## 使用实例
```html
    <form-modal
      :visible="userModifyForm.visible"
      :title="userModifyForm.title"
      :form-id="userModifyForm.formId"
      :formItems="userModifyForm.formItems"
      @submit="handleFormSubmit"
      @cancel="handleFormCancel"
    />
```
```javascript
export default {
  data() {
    return {
      // 弹出框
      userModifyForm: {
        formId: 'userModifyForm',
        visible: false,
        title: '新增用户',
        formItems: [
          { label: '名称', name: 'name', type: 'text', rules: [{required: true, min: 5, message: '请输入至少五个字符的名称！'}] },
          { label: '年龄', name: 'age', type: 'number' },
          { label: '性别', name: 'gender', type: 'select', options: ['男', '女'] },
          { label: '生日', name: 'birthday', type: 'date' }
        ]
      }
    }
  },
  methods: {
    // 表单
    handleFormSubmit() {
      console.log('处理提交')
      this.$set(this.userModifyForm, 'visible', false)
    },
    handleFormCancel() {
      console.log('处理取消')
      this.$set(this.userModifyForm, 'visible', false)
    }
  }
}
```
