/**
 * Author: YIueil
 * Date: 2023/9/14 21:20
 * Description: 静态路由 提前配置好的路由
 */
const constantRouter = [
  {
    path: 'access',
    name: 'Access',
    component: () => import('@/layouts/AccessLayout'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/common/access/LoginView')
      }
    ]
  }
]
export default constantRouter
