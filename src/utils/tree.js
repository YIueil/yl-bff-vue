/**
 * 遍历树结构(深度优先DFS)
 * @param treeNode 节点
 * @param callback 回调参数
 * @param childName 子节点名称
 */
export function forEachDFS(treeNode, callback, childName = 'children') {
  callback(treeNode)
  if (treeNode[childName]) {
    treeNode[childName].forEach(node => {
      callback(node)
    })
  }
}
/**
 * 遍历树结构(广度优先BFS)
 * @param treeNode 节点
 * @param callback 回调参数
 * @param childName 子节点名称
 */
export function forEachBFS(treeNode, callback, childName = 'children') {
  const queue = [treeNode] // 队列（用于存储待遍历的节点）
  while (queue.length > 0) {
    const currentNode = queue.shift() // 取出队首节点
    callback(currentNode) // 对当前节点执行回调函数
    if (currentNode[childName]) {
      // 将子节点依次加入到队列尾部
      currentNode[childName].forEach((node) => {
        queue.push(node)
      })
    }
  }
}
/**
 * 将树结构中的每个节点转换为另一种类型
 * @param treeNode 树结构节点对象
 * @param transform 转换函数，接受一个节点并返回转换后的新节点
 * @param childName 子节点名称
 * @returns 转换后的树结构节点对象
 */
export function map(treeNode, transform, childName = 'children') {
  const newNode = transform(treeNode) // 转换当前节点
  if (newNode && treeNode[childName]) {
    // 转换子节点并添加到新节点的子节点列表中
    newNode[childName] = treeNode[childName].map((node) =>
      map(node, transform, childName)
    )
  }
  return newNode
}
/**
 * 在树结构中过滤出符合条件的节点
 * @param treeNode 树结构节点对象
 * @param expression 过滤表达式，接受一个节点并返回true或false
 * @param childName 子节点名称
 * @returns 树形结构节点对象
 */
export function filter(treeNode, expression, childName = 'children') {
  const newTree = { ...treeNode } // 拷贝一份原始树，作为新的树
  if (expression(newTree)) { // 判断根节点是否符合表达式
    newTree[childName] = newTree[childName]?.map((child) => filter(child, expression, childName)) // 遍历子节点
  } else {
    return null // 不符合表达式，返回null表示删除该节点
  }
  newTree[childName] = newTree[childName]?.filter((child) => child !== null) // 过滤掉被删除的节点
  return newTree
}
/**
 * 将节点数组转换为树形结构
 * @param nodes 符合条件的节点数组
 * @param childName 子节点名称
 * @param  parent 父节点对象, 默认为null
 * @returns 树形结构节点对象
 */
export function listToTree(nodes, childName = 'children', parent = null) {
  const rootNodes = [] // 所有根节点列表
  // 遍历每个节点，将其添加到父节点的子节点列表中
  nodes.forEach((node) => {
    if (node.parentId === parent?.id) {
      const newNode = { ...node }
      if (parent) {
        if (!parent[childName]) {
          parent[childName] = []
        }
        parent[childName].push(newNode)
      } else {
        rootNodes.push(newNode)
      }
      listToTree(nodes, childName, newNode) // 继续递归处理子节点
    }
  })
  return rootNodes.length > 0 ? rootNodes : null
}
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
  forEachDFS,
  forEachBFS,
  findNodes,
  includes,
  map,
  filter,
  listToTree
}
