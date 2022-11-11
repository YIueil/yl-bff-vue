/**
 * Author:YIueil
 * Date:2022/11/11 23:58
 * Description: 自定义指令 组件可拖拽
 * 已知 bug:
 * 1、对于移动没有宽度和高度的元素会有异常
 * 2、对于含有 margin 外边距的元素会有异常
 * 3、会清除掉原有的 border
 */
import Vue from 'vue'

Vue.directive('draggable', (el) => {
  el.draggable = false
  el.style.cursor = 'move'
  el.onmousedown = mousedownEvent => {
    // 靠近元素边缘则什么也不做 防止影响拖拉缩放功能
    if ((mousedownEvent.clientX > el.offsetLeft + el.clientWidth - 20 || el.offsetLeft + 20 > mousedownEvent.clientX)
        || (el.scrollTop + mousedownEvent.clientY > el.offsetTop + el.clientHeight - 20)) {
      return
    }
    el.style.position = 'fixed'
    el.style.userSelect = 'none'
    el.style.border = '1px solid red'
    // 点击的元素内部偏移
    const startOffset = {
      x: mousedownEvent.offsetX,
      y: mousedownEvent.offsetY
    }
    const moving = (e) => {
      el.style.left = (e.clientX - startOffset.x) + 'px'
      el.style.top = (e.clientY - startOffset.y) + 'px'
    }
    document.addEventListener('mousemove', moving, false)
    document.onmouseup = () => {
      el.style.border = 'none'
      el.style.userSelect = 'unset'
      document.removeEventListener('mousemove', moving, false)
    }
  }
})


