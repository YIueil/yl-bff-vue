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
    meta: {
      icon: 'user',
      title: '个人信息管理',
      rightName: '个人信息管理'
    },
    children: [
      {
        path: '/account/center',
        name: 'AccountCenter',
        meta: {
          icon: 'user',
          title: '基本信息',
          rightName: '基本信息'
        },
        component: () => import('@/views/account/AccountCenter')
      },
      {
        path: '/account/setting',
        name: 'AccountSetting',
        meta: {
          icon: 'setting',
          title: '个人设置',
          rightName: '个人设置'
        },
        component: () => import('@/views/account/AccountSetting/Index')
      },
      {
        path: '/account/message',
        name: 'AccountMessage',
        meta: {
          icon: 'message',
          title: '消息中心',
          rightName: '消息中心'
        },
        component: () => import('@/views/account/AccountMessage/Index')
      }
    ]
  },
  {
    path: '/application',
    name: 'Application',
    redirect: '/application/center',
    component: BasicLayout,
    meta: {
      icon: 'appstore',
      title: '应用功能管理',
      rightName: '应用功能管理'
    },
    children: [
      {
        path: '/application/center',
        name: 'ApplicationCenter',
        meta: {
          title: '应用中心',
          rightName: '应用中心'
        },
        component: () => import('@/views/application/ApplicationCenter/Index')
      },
      {
        path: '/application/functionManage',
        name: 'FunctionManage',
        meta: {
          title: '应用功能',
          rightName: '应用功能'
        },
        component: () => import('@/views/application/FunctionManage/Index')
      }
    ]
  },
  {
    path: '/organization',
    name: 'Organization',
    redirect: '/organization/center',
    meta: {
      icon: 'deployment-unit',
      title: '机构用户管理',
      rightName: '机构用户管理'
    },
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
        meta: {
          title: '用户管理',
          rightName: '用户管理'
        },
        component: () => import('@/views/organization/UserManagement/Index')
      },
      {
        path: '/organization/organizationManagement',
        name: 'OrganizationManagement',
        meta: {
          title: '机构管理',
          rightName: '机构管理'
        },
        component: () => import('@/views/organization/OrganizationManagement/Index')
      }
    ]
  },
  {
    path: '/rolePermission',
    name: 'RolePermission',
    redirect: '/rolePermission/center',
    component: BasicLayout,
    meta: {
      icon: 'safety',
      title: '角色权限管理',
      rightName: '角色权限管理'
    },
    children: [
      {
        path: '/rolePermission/center',
        name: 'RolePermissionCenter',
        component: () => import('@/views/rolePermission/RolePermissionCenter')
      },
      {
        path: '/rolePermission/roleManagement',
        name: 'RoleManagement',
        meta: {
          title: '角色管理',
          rightName: '角色管理'
        },
        component: () => import('@/views/rolePermission/RoleManagement/Index')
      },
      {
        path: '/rolePermission/permissionManagement',
        name: 'PermissionManagement',
        meta: {
          title: '权限管理',
          rightName: '权限管理'
        },
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
