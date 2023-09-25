/**
 * Author: YIueil
 * Date: 2023/9/25 21:17
 * Description: menuStore 菜单Store, 有基于路由的动态菜单和静态菜单两种
 */
function generateMenuList(routes) {
  const menuList = [{
    id: 1,
    name: '机构角色',
    type: 'model',
    children: [{
      id: 4,
      name: '个人信息',
      children: [{
        id: 8,
        name: '基本信息'
      }, {
        id: 9,
        name: '个人设置'
      }],
      icon: 'mail',
      sort: 1
    }, {
      id: 5,
      name: '机构用户',
      children: []
    }, {
      id: 6,
      name: '角色权限',
      children: []
    }, {
      id: 7,
      name: '应用功能',
      children: []
    }],
    icon: '',
    sort: 1
  }, {
    id: 2,
    name: '业务建模',
    type: 'model',
    children: [],
    icon: '',
    sort: 1
  }, {
    id: 3,
    name: '平台维护',
    type: 'model',
    children: [],
    icon: '',
    sort: 1
  }]
  console.log('生成菜单', routes)
  return menuList
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
