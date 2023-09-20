# 路由节点定义
```js
      const node = {
        path: '/test',
        name: 'TestComponent',
        meta: {
          // 缓存组件
          keepAlive: true,
          // 隐藏菜单
          isHide: false,
          // 隐藏子菜单
          hideChildren: false,
          // 菜单标题
          title: '预览页面',
          // 菜单图标
          icon: null,
          // 菜单面包屑
          breadcrumb: [{
            title: '首页',
            path: '/'
          }, {
            title: '子页面',
            path: '/child1'
          }],
          // 所在模块组
          group: 'test',
          // 标识名
          rightName: '测试组件'
        },
        component: () => import('@/views/common/test/ThemeTestComponent')
      }
```
