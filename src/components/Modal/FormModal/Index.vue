<template>
  <a-modal :visible="visible" :title="title" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="form" :form="form" :model="formData" v-bind="formLayout">
      <a-form-item v-show="!item.hide" v-for="(item, index) in formItems" :label="item.label" :key="index">
        <template v-if="item.type === 'text'">
          <a-input :disabled="item.disabled" v-decorator="[item.name, {rules: item.rules}]" allow-clear/>
        </template>
        <template v-if="item.type === 'password'">
          <a-input-password :disabled="item.disabled" v-decorator="[item.name, {rules: item.rules}]" allow-clear
                            autocomplete="off"/>
        </template>
        <template v-else-if="item.type === 'number'">
          <a-input-number :disabled="item.disabled" v-decorator="[item.name, {rules: item.rules}]"/>
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select :disabled="item.disabled" v-decorator="[item.name, {rules: item.rules}]">
            <a-select-option v-for="(option, index) in item.options" :key="index" :value="option">{{
                option
              }}
            </a-select-option>
          </a-select>
        </template>
        <template v-else-if="item.type === 'date'">
          <a-date-picker :disabled="item.disabled" v-decorator="[item.name, {rules: item.rules}]"/>
        </template>
        <template v-else-if="item.type === 'radioGroup'">
          <a-radio-group :disabled="item.disabled"
                         v-decorator="[item.name, {rules: item.rules, initialValue: item.options.find(item => item.checked)?.value}]"
                         button-style="solid">
            <a-radio-button
              v-for="(option, index) in item.options"
              :key="index"
              :span="8"
              :value="option.value">
              {{ option.label }}
            </a-radio-button>
          </a-radio-group>
        </template>
        <template v-else-if="item.type === 'checkBoxGroup'">
          <a-checkbox-group :disabled="item.disabled" v-decorator="[item.name, {rules: item.rules}]"
                            :default-value="item.options.filter(item => item.checked)?.map(item => item.value)">
            <a-checkbox
              v-for="(option, index) in item.options"
              :key="index"
              :span="8"
              :value="option.value">
              {{ option.label }}
            </a-checkbox>
          </a-checkbox-group>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

export default {
  name: 'FormModal',
  props: {
    formId: String,
    visible: Boolean,
    title: String,
    formItems: Array,
    model: Object
  },
  data() {
    return {
      form: null,
      formData: {},
      formLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        }
      }
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.formData = {}
        this.form.resetFields()
      }
    }
  },
  methods: {
    handleOk() {
      this.form.validateFields(((errors, data) => {
        if (!errors) {
          console.log('data', data)
          this.$emit('submit', data)
        } else {
          console.log(errors)
        }
      }))
    },
    handleCancel() {
      this.$emit('cancel')
    },
    setData(data) {
      console.log('设置表单值', data)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, this.formItems.map(item => item.name)))
        this.$forceUpdate()
      })
    }
  },
  created() {
    // 创建出form对象, 提供给内部ant-form使用
    this.form = this.$form.createForm(this, { name: this.formId })
    // 防止表单未注册
    this.formItems.map(item => item.name).forEach(v => this.form.getFieldDecorator(v))
    // 使用$watch方法监听组件的响应式数据，并在数据发生改变时更新表单控件的值
    this.$watch('model', (newValue) => {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(newValue, this.formItems.map(item => item.name)))
      })
    }, { deep: true })
  }
}
</script>

