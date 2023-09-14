/**
 * Author: YIueil
 * Date: 2023/9/14 22:02
 * Description: 基础路由(通常情况不需要修改)
 */
const baseRoutes = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/common/exception/401')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/exception/404')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/common/exception/500')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/common/about/AboutView')
  }
]
export default baseRoutes
