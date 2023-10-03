/**
 * Author: YIueil
 * Date: 2023/10/3 20:15
 * Description: 正则工具类
 */
const pattern = {
  // 手机号码
  phone: /^1[3-9]\d{9}$/,
  // 邮箱地址
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  // 身份证号码（18位）
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 中文汉字
  chinese: /^[\u4e00-\u9fa5]+$/,
  // 英文字母（不区分大小写）
  english: /^[a-zA-Z]+$/,
  // 整数
  integer: /^-?\d+$/,
  // 正整数
  positiveInteger: /^[1-9]\d*$/,
  // 浮点数（支持小数点后两位）
  float: /^[-+]?\d+(\.\d{1,2})?$/
}
export default pattern


