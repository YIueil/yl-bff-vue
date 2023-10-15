/**
 * Author: YIueil
 * Date: 2023/9/25 21:17
 * Description: menuStore 菜单Store, 有基于路由的动态菜单和静态菜单两种
 */
import tree from '@/utils/tree'
import baseMenu from '@/config/base-menu'
// import { testMenu } from '@/config/mock-data'

function generateMenuList(routes, functions) {
  let index = 0
  const menuList = []
  routes.forEach(routeNode => {
    const menuTree = tree.map(routeNode, route => {
      if (route.meta && route.meta.rightName) {
        const findNodes = tree.findNodes(functions, 'rightName', route.meta.rightName)
        if (findNodes.length > 0) {
          if (findNodes.length > 1) {
            console.warn('配置中rightName重复')
          }
          return {
            id: ++index,
            name: route.meta.title,
            icon: route.meta.icon,
            router: {
              path: route.path,
              name: route.name
            }
          }
        }
      }
    })
    const filterTree = tree.filter(menuTree, node => {
      return node.name
    })
    if (filterTree) {
      menuList.push(filterTree)
    }
  })
  console.log('generateMenuList', routes, functions, menuList)
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
    GEN_MENU: (state, { userRoutes, userFunctions }) => {
      state.menuList = generateMenuList(userRoutes, userFunctions)
    },
    UPDATE_MODEL: (state, modelId) => {
      state.currentModel = state.modelList.find(model => model.id === modelId)
    }
  }
}
export default menu
