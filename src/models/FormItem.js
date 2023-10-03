/**
 * Author: YIueil
 * Date: 2023/10/3 18:38
 * Description: 表单组件渲染对象
 */
export default class FormItem {
  /**
   * 创建一个表单组件项
   * @param {String} label - 组件描述名称
   * @param {string} name - 组件绑定字段名称
   * @param {string} type - 组件类型
   * @param {Array} rules - 校验规则
   * @param {Array} options - 详情配置项(适用与check和select选择的情况)
   * @param {Object} defaultValue - 默认值
   */
  constructor(label, name, type, rules , options, defaultValue) {
    this.label = label
    this.name = name || ''
    this.type = type || ''
    this.rules = rules
    this.options = options || {}
    this.defaultValue = defaultValue
  }
}
