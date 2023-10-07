/**
 * Author: YIueil
 * Date: 2023/9/27 18:20
 * Description: 路由项类定义
 */
export default class RouterItem {
  /**
   * 创建一个路由项
   * @param {string} path - 路径
   * @param {string} name - 名称
   * @param {Object} meta - 元数据
   * @param {boolean} meta.keepAlive - 是否缓存组件
   * @param {boolean} meta.isHide - 是否隐藏菜单
   * @param {boolean} meta.hideChildren - 是否隐藏子菜单
   * @param {string} meta.title - 菜单标题
   * @param {string} meta.icon - 菜单图标
   * @param {Array} meta.breadcrumb - 菜单面包屑数组
   * @param {string} meta.breadcrumb.title - 菜单面包屑名称
   * @param {string} meta.breadcrumb.icon - 菜单面包屑图标
   * @param {string} meta.breadcrumb.path - 菜单面包屑路由地址
   * @param {string} meta.group - 所在模块组
   * @param {string} meta.rightName - 标识名
   * @param {Function} component - 组件函数
   */
  constructor(path, name, meta = {}, component) {
    this.path = path || ''
    this.name = name || ''
    this.meta = meta || {}
    this.component = component || null
  }
}
