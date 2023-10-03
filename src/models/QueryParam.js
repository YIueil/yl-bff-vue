/**
 * Author: YIueil
 * Date: 2023/10/3 13:07
 * Description: 动态查询参数
 */
export default class QueryParam {
  /**
   * 创建一个动态查询对象
   * @param {String | null} configPath - 动态查询文件夹路径
   * @param {string | null} configFile - 动态查询文件路径
   * @param {string} configId - 动态查询配置项的id
   * @param {Object} filter - 动态查询条件
   * @param {String | null} fullPath - 动态查询配置全路径
   * @param {Object} config - 动态查询配置选项
   * @param {Boolean} config.toUpperCase - 查询结果大小写转换
   */
  constructor(configPath, configFile, configId, filter, fullPath, config = { toUpperCase: false }) {
    this.configPath = configPath
    this.configFile = configFile
    this.configId = configId
    this.filter = filter
    this.fullPath = fullPath
    this.config = config
  }
}
