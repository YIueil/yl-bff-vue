/**
 * Author: YIueil
 * Date: 2023/10/3 12:10
 * Description: 承载表格定义
 */
export default {
  // region 机构用户
  userManagementTable: [
    {
      title: '#',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '编号',
      dataIndex: 'guid'
    },
    {
      title: '用户名',
      dataIndex: 'userName'
    },
    {
      title: '登录名',
      dataIndex: 'loginName'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      scopedSlots: { customRender: 'createTime' },
      sorter: true
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      scopedSlots: { customRender: 'modifyTime' },
      sorter: true
    },
    {
      title: '最后上线时间',
      dataIndex: 'lastLoginTime',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]
  // endregion
}
