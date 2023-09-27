/**
 * Author: YIueil
 * Date: 2023/9/27 18:14
 * Description: 菜单项类定义
 */
export default class MenuItem {
  /**
   * 创建一个菜单项
   * @param {number} id - 菜单项ID
   * @param {string} name - 菜单项名称
   * @param {string} icon - 菜单项图标
   * @param {number} sorter - 菜单项排序值(默认值为-1)
   * @param {Object} router - 路由配置对象(默认为空对象)
   * @param {Array} children - 子菜单项数组(默认为空数组)
   */
  constructor(id, name, icon, sorter = -1, router = {}, children = []) {
    this.id = id
    this.name = name || ''
    this.icon = icon || ''
    this.sorter = sorter >= 0 ? sorter : -1
    this.router = router || {}
    this.children = children || []
  }
}
