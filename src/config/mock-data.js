export const testMenu = [{
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
