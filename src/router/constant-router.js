/**
 * Author: YIueil
 * Date: 2023/9/14 21:20
 * Description: 静态路由 提前配置好的路由
 */
import { AccessLayout, BasicLayout } from '@/layouts'

const constantRouter = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home')
      }
    ]
  },
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
  },
  {
    path: '/account',
    name: 'Account',
    redirect: '/account/center',
    component: BasicLayout,
    children: [
      {
        path: '/account/center',
        name: 'AccountCenter',
        component: () => import('@/views/account/AccountCenter')
      },
      {
        path: '/account/setting',
        name: 'AccountSetting',
        component: () => import('@/views/account/AccountSetting/Index')
      },
      {
        path: '/account/message',
        name: 'AccountMessage',
        component: () => import('@/views/account/AccountMessage/Index')
      }
    ]
  },
  {
    path: '/application',
    name: 'Application',
    redirect: '/application/center',
    component: BasicLayout,
    children: [
      {
        path: '/application/center',
        name: 'ApplicationCenter',
        component: () => import('@/views/application/ApplicationCenter')
      }
    ]
  },
  {
    path: '/organization',
    name: 'Organization',
    redirect: '/organization/center',
    component: BasicLayout,
    children: [
      {
        path: '/organization/center',
        name: 'OrganizationCenter',
        component: () => import('@/views/organization/OrganizationCenter')
      },
      {
        path: '/organization/userManagement',
        name: 'UserManagement',
        component: () => import('@/views/organization/UserManagement/Index')
      },
      {
        path: '/organization/organizationManagement',
        name: 'OrganizationManagement',
        component: () => import('@/views/organization/OrganizationManagement/Index')
      }
    ]
  },
  {
    path: '/rolePermission',
    name: 'RolePermission',
    redirect: '/rolePermission/center',
    component: BasicLayout,
    children: [
      {
        path: '/rolePermission/center',
        name: 'RolePermissionCenter',
        component: () => import('@/views/rolePermission/RolePermissionCenter')
      },
      {
        path: '/rolePermission/roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/rolePermission/RoleManagement/Index')
      },
      {
        path: '/rolePermission/permissionManagement',
        name: 'PermissionManagement',
        component: () => import('@/views/rolePermission/PermissionManagement/Index')
      }
    ]
  },
  {
    path: '/audit',
    name: 'Audit',
    redirect: '/audit/center',
    component: BasicLayout,
    children: [
      {
        path: '/audit/center',
        name: 'AuditCenter',
        component: () => import('@/views/audit/AuditCenter')
      }
    ]
  },
  {
    path: '/strategy',
    name: 'Strategy',
    redirect: '/strategy/center',
    component: BasicLayout,
    children: [
      {
        path: '/strategy/center',
        name: 'StrategyCenter',
        component: () => import('@/views/strategy/StrategyCenter')
      }
    ]
  }
]
export default constantRouter
