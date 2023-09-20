/**
 * Author: YIueil
 * Date: 2023/9/14 21:20
 * Description: 静态路由 提前配置好的路由
 */
import { AccessLayout } from '@/layouts'

const constantRouter = [
  {
    path: '/access',
    name: 'Access',
    redirect: '/login',
    component: AccessLayout,
    children: [{
      path: '/login',
      name: 'Login',
      meta: {
        breadcrumb: [{
          title: '首页',
          icon: 'home',
          path: '/'
        }, {
          title: '登陆',
          icon: 'user',
          path: '/login'
        }]
      },
      component: () => import('@/views/common/access/LoginView')
    }, {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/common/access/RegisterView')
    }]
  }
]
export default constantRouter
