/**
 * Author: YIueil
 * Date: 2023/9/14 22:02
 * Description: 基础路由(通常情况不需要修改)
 */
import { BlankLayout } from '@/layouts' // 基础布局
const baseRoutes = [
  {
    path: '/test',
    name: 'Test',
    component: BlankLayout,
    redirect: '/test',
    children: [
      {
        path: '/test',
        name: 'TestComponent',
        meta: {
          title: '预览页面',
          icon: null,
          keepAlive: true,
          group: ''
        },
        component: () => import('@/views/common/test/ThemeTestComponent')
      },
      {
        path: '/test2',
        name: 'FileViewComponent',
        meta: {
          title: '测试页面用',
          icon: null,
          keepAlive: true,
          group: ''
        },
        component: () => import('@/views/common/test/FileViewComponent')
      }
    ]
  },
  {
    path: '/exception',
    name: 'Error',
    component: BlankLayout,
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/common/about/AboutView')
      },
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
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default baseRoutes
