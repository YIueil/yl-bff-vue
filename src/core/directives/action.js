/**
 * Author:YIueil
 * Date:2022/11/11 23:58
 * Description: 自定义指令 组件权限控制
 */
import Vue from 'vue'

Vue.directive('action', (el, binding, vNode) => {
  const actionName = binding.arg
  const buttons = vNode.context.$route.meta.btns
  if (!buttons || !buttons.map(button => button.name).includes(actionName)) {
    el.parentNode?.removeChild(el) || (el.style.display = 'none')
  }
})


