/**
 * Author: YIueil
 * Date: 2023/9/14 17:45
 * Description: 默认设置
 */
export default {
  // 应用id
  applicationId: 1,
  // 应用标题
  applicationName: 'yl-bff-vue',
  // 运行环境
  production: process.env.NODE_ENV === 'production',
  // 应用Token过期时间
  tokenExpire: 7 * 24 * 60 * 60 * 1000,
  // 启动用户路由
  useUserRoutes: false,
  // 导航条样式
  navTheme: 'light',
  // 主题颜色
  primaryColor: '#1890ff'
}
