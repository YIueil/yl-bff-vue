/**
 * Author: YIueil
 * Date: 2023/9/14 18:08
 * Description: 初始化启动初始化
 */
// iconfont 图标库
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont'
// ant design vue
import '@/core/antd'
// 全局样式
import '@/global.less'
// 自定义指令
import '@/core/directives'
// 过滤器
import '@/core/filter'
// 路由导航
import '@/core/permission'
// 启动图
import printBanner from './banner'

export function Initializer() {
  // 打印banner
  printBanner()
}
