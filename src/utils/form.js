/**
 * Author: YIueil
 * Date: 2023/10/3 19:46
 * Description: 承载表单定义
 */
// 常用正则校验
import pattern from '@/utils/pattern'

export default {
  // region 机构用户
  userAddForm: [
    { label: '用户名', name: 'userName', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '登录名', name: 'loginName', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '密码', name: 'password', type: 'password', rules: [{ required: true, min: 6, message: '6个字符以上！' }] },
    { label: '手机号', name: 'phoneNumber', type: 'text', rules: [{ pattern: pattern.phone, message: '请输入正确的手机号码' }] },
    { label: '邮箱', name: 'email', type: 'text', rules: [{ pattern: pattern.email, message: '请输入正确的邮箱' }] },
    {
      label: '状态',
      name: 'status',
      type: 'radioGroup',
      rules: [{ required: true, message: '请选择状态' }],
      options: [{
        label: '正常',
        value: '正常',
        checked: true
      }, {
        label: '挂起',
        value: '挂起'
      }, {
        label: '休假',
        value: '休假'
      }, {
        label: '离职',
        value: '离职'
      }]
    }
  ],
  userEditForm: [
    { label: 'ID', name: 'id', type: 'text', hide: true },
    { label: '用户标识', name: 'guid', type: 'text', disabled: true },
    { label: '用户名', name: 'userName', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '登录名', name: 'loginName', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '手机号', name: 'phoneNumber', type: 'text', rules: [{ pattern: pattern.phone, message: '请输入正确的手机号码' }] },
    { label: '邮箱', name: 'email', type: 'text', rules: [{ pattern: pattern.email, message: '请输入正确的邮箱' }] },
    {
      label: '状态',
      name: 'status',
      type: 'radioGroup',
      rules: [{ required: true, message: '请选择状态' }],
      options: [{
        label: '正常',
        value: '正常',
        checked: true
      }, {
        label: '挂起',
        value: '挂起'
      }, {
        label: '休假',
        value: '休假'
      }, {
        label: '离职',
        value: '离职'
      }]
    }
  ],
  orgAddForm: [
    { label: '机构名称', name: 'name', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '机构代码', name: 'code', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '机构类型', name: 'type', type: 'select', rules: [{ required: true }], options: ['单位', '部门'] },
    { label: '描述', name: 'description', type: 'textarea' },
    { label: '父节点', name: 'parentName', type: 'text', placeholder: '根节点', disabled: true },
    { label: '父节点Id', name: 'parentId', type: 'text', hide: true }
  ],
  orgEditForm: [
    { label: 'id', name: 'id', type: 'text', hide: true },
    { label: '机构名称', name: 'name', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '机构代码', name: 'code', type: 'text', rules: [{ required: true, min: 2, message: '2个字符以上！' }] },
    { label: '机构类型', name: 'type', type: 'select', rules: [{ required: true }], options: ['单位', '部门'] },
    { label: '描述', name: 'description', type: 'textarea' },
    { label: '父节点Id', name: 'parentId', type: 'text', hide: true }
  ]
  // endregion
}
