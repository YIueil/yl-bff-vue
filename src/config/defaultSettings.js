/**
 * Author: YIueil
 * Date: 2023/9/14 17:45
 * Description: 默认设置
 */
export default {
  // 超时时间
  tokenExpire: 7 * 24 * 60 * 60 * 1000,
  navTheme: 'light',
  primaryColor: '#1890ff',
  title: 'yl-acc',
  production: process.env.NODE_ENV === 'production'
}
