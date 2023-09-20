/**
 * 节点查找, 查找树节点中某个属性为某个值的对象集合
 * @param tree 树节点
 * @param keyName 节点字段名称
 * @param keyValue 节点字段值
 * @param childName 子节点字段名称
 * @returns {*[]} 返回符合结果的节点
 */
export function findNodes(tree, keyName, keyValue, childName = 'children') {
  const result = []
  function traverse(node) {
    if (node === null) {
      return
    }
    if (typeof node === 'object') {
      if (Array.isArray(node)) {
        node.forEach(item => traverse(item))
      } else {
        if (node[keyName] === keyValue) {
          result.push(node)
        }
        if (node[childName]) {
          traverse(node[childName])
        }
      }
    }
  }
  traverse(tree)
  return result
}
/**
 * 节点是否包含, 判断树节点中某个属性为某个值的对象集合
 * @param tree
 * @param keyName
 * @param keyValue
 * @param childName
 */
export function includes(tree, keyName, keyValue, childName = 'children') {
  return findNodes(tree, keyName, keyValue, childName).length > 0
}
export default {
  findNodes
}
