/**
 * Author: YIueil
 * Date: 2023/9/25 21:17
 * Description: menuStore 菜单Store, 有基于路由的动态菜单和静态菜单两种
 */
import baseMenu from '@/config/base-menu'

function generateMenuList(routes) {
  const menuList = [{
    id: 4,
    name: '个人信息管理',
    children: [{
      id: 8,
      name: '基本信息',
      icon: 'user',
      router: {
        path: '/account/center',
        name: 'AccountCenter'
      }
    }, {
      id: 9,
      name: '个人设置',
      icon: 'setting',
      router: {
        path: '/account/setting',
        name: 'AccountSetting'
      }
    }, {
      id: 16,
      name: '消息中心',
      icon: 'message',
      router: {
        path: '/account/message',
        name: 'AccountMessage'
      }
    }],
    icon: 'user',
    sort: 1
  }, {
    id: 5,
    name: '机构用户管理',
    icon: 'deployment-unit',
    children: [{
      id: 11,
      name: '用户管理',
      router: {
        path: '/organization/userManagement',
        name: 'UserManagement'
      }
    }, {
      id: 12,
      name: '机构管理',
      router: {
        path: '/organization/organizationManagement',
        name: 'OrganizationManagement'
      }
    }]
  }, {
    id: 6,
    name: '角色权限管理',
    icon: 'safety',
    children: [{
      id: 13,
      name: '角色管理',
      router: {
        path: '/rolePermission/roleManagement',
        name: 'RoleManagement'
      }
    }, {
      id: 14,
      name: '权限管理',
      router: {
        path: '/rolePermission/permissionManagement',
        name: 'PermissionManagement'
      }
    }]
  }, {
    id: 7,
    name: '应用功能管理',
    icon: 'appstore',
    children: [{
      id: 15,
      name: '应用中心',
      router: {
        path: '/application/center',
        name: 'ApplicationCenter'
      }
    }, {
      id: 18,
      name: '应用功能',
      router: {
        path: '/application/functionManage',
        name: 'FunctionManage'
      }
    }]
  }, {
    id: 0,
    name: '审计日志管理',
    icon: 'audit',
    children: [{
      id: 17,
      name: '接口调用日志'
    }]
  }]
  console.log('生成菜单', routes)
  return baseMenu.concat(menuList)
}

const menu = {
  state: {
    menuList: [],
    modelList: [{
      id: 1,
      name: '机构角色',
      shortName: 'org',
      type: 'model',
      children: [],
      icon: 'appstore',
      sort: 1
    }, {
      id: 2,
      name: '业务建模',
      shortName: 'bus',
      type: 'model',
      children: [],
      icon: 'appstore',
      sort: 1
    }, {
      id: 3,
      name: '平台维护',
      shortName: 'manage',
      type: 'model',
      children: [],
      icon: 'appstore',
      sort: 1
    }],
    currentModel: ''
  },
  mutations: {
    SET_MENU: (state, menuList) => {
      state.menuList = menuList
    },
    SET_MODEL: (state, modelList) => {
      state.modelList = modelList
    },
    GEN_MENU: (state, routes) => {
      state.menuList = generateMenuList(routes)
    },
    UPDATE_MODEL: (state, modelId) => {
      state.currentModel = state.modelList.find(model => model.id === modelId)
    }
  }
}
export default menu
