import router from '@/router'

// 路由白名单
const allowRouterList = ['Login', 'Register', 'About']

/**
 * 前置路由导航守卫
 */
router.beforeEach((to, from, next) => {
  console.log(to)
  if (allowRouterList.includes(to.name)) {
    // 在路由白名单，直接进入
    next()
  } else {
    // todo 加载动态路由
    // router.push(store.getters.userRoutes)
    // todo 判断当前的路由是否需要登录
    next()
  }
})
router.afterEach(() => {
  // 路由导航结束做点什么
})
