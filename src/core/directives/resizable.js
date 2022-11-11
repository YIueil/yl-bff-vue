/**
 * Author:YIueil
 * Date:2022/11/12 0:01
 * Description: 自定义指令 元素可放大缩小
 * 1、与 draggable 共存
 * 2、右侧和下方支持拖拉缩放
 * 3、右下角添加元素 '三角' 标识可以放大缩小
 */
import Vue from 'vue'

Vue.directive('resizable', (el) => {
  // 创建倒三角元素, 标识该元素支持边缘放大缩小
  const icon = document.createElement('div')
  icon.style.position = 'absolute'
  icon.style.bottom = '1px'
  icon.style.right = '1px'
  icon.style.height = '0'
  icon.style.width = '0'
  icon.style.borderLeft = '10px solid rgba(0,0,0,0)'
  icon.style.borderBottom = '10px solid #2c2f3b'
  el.appendChild(icon)

  // 弹框可拉伸最小宽高
  const minWidth = 20
  const minHeight = 20
  // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog
  el.style.overflow = 'auto'
  el.onmousemove = function(e) {
    const resize = (e) => {
      el.style.userSelect = 'none'
      const clientX = e.clientX
      const clientY = e.clientY
      const elW = el.clientWidth
      const elH = el.clientHeight
      const ElOffsetLeft = el.offsetLeft
      const ElOffsetTop = el.offsetTop
      const ELScrollTop = el.scrollTop
      const resizing = e => {
        // 右侧鼠标拖拽位置
        if (clientX > ElOffsetLeft + elW - 10 && clientX < ElOffsetLeft + elW) {
          // 往左拖拽
          if (clientX > e.clientX) {
            if (el.clientWidth >= minWidth) {
              el.style.width = elW - (clientX - e.clientX) + 'px'
            }
          }
          // 往右拖拽
          if (clientX < e.clientX) {
            el.style.width = elW + (e.clientX - clientX) + 'px'
          }
        }
        // 下方鼠标拖拽位置
        if (ELScrollTop + clientY > ElOffsetTop + elH - 20 && ELScrollTop + clientY < ElOffsetTop + elH) {
          // 往上拖拽
          if (clientY > e.clientY) {
            if (el.clientHeight >= minHeight) {
              el.style.height = elH - (clientY - e.clientY) + 'px'
            }
          }
          // 往下拖拽
          if (clientY < e.clientY) {
            el.style.height = elH + (e.clientY - clientY) + 'px'
          }
        }
      }
      const remove = () => {
        document.removeEventListener('mouseup', remove, false)
        document.removeEventListener('mousemove', resizing, false)
      }
      // 拉伸结束
      document.addEventListener('mouseup', remove, false)
      document.addEventListener('mousemove', resizing, false)
    }
    if ((e.clientX > el.offsetLeft + el.clientWidth - 10 || el.offsetLeft + 10 > e.clientX)
        && (el.scrollTop + e.clientY > el.offsetTop + el.clientHeight - 10)) { // 右下边缘
      el.style.cursor = 'se-resize'
    } else if (e.clientX > el.offsetLeft + el.clientWidth - 10) { // 右侧边缘
      el.style.cursor = 'e-resize'
    } else if (el.scrollTop + e.clientY > el.offsetTop + el.clientHeight - 10) { // 下方边缘
      el.style.cursor = 's-resize'
    } else {
      el.style.cursor = 'default'
      el.removeEventListener('mousedown', resize, false)
    }
    el.addEventListener('mousedown', resize, false)
  }
})
