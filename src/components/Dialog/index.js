import Modal from 'ant-design-vue/es/modal'

/**
 * 示例用法
 * this.$dialog(TaskForm,
 * // component props
 * {
 *    record: {},
 *    on: {
 *      ok () {
 *        console.log('ok 回调')
 *      },
 *      cancel () {
 *        console.log('cancel 回调')
 *      },
 *      close () {
 *        console.log('modal close 回调')
 *      }
 *    }
 *  },
 * // modal props
 * {
 *    title: '新增',
 *    width: 700,
 *    centered: true,
 *    maskClosable: false
 *  })
 * @param Vue
 */
export default (Vue) => {
  function dialog(component, componentProps, modalProps) {
    const _vm = this
    modalProps = modalProps || {}
    if (!_vm || !_vm._isVue) {
      return
    }
    let dialogDiv = document.querySelector('body>div[type=dialog]')
    if (!dialogDiv) {
      dialogDiv = document.createElement('div')
      dialogDiv.setAttribute('type', 'dialog')
      document.body.appendChild(dialogDiv)
    }
    const handle = function(checkFunction, afterHandel) {
      if (checkFunction instanceof Function) {
        const res = checkFunction(this)
        if (res instanceof Promise) {
          res.then(c => {
            c && afterHandel()
          })
        } else {
          res && afterHandel()
        }
      } else {
        // checkFunction && afterHandel()
        checkFunction || afterHandel()
      }
    }
    const dialogInstance = new Vue({
      data() {
        return {
          visible: true
        }
      },
      router: _vm.$router,
      store: _vm.$store,
      mounted() {
        this.$on('close', (v) => {
          console.log(v)
          this.handleClose()
        })
      },
      methods: {
        handleClose() {
          handle(this.$refs._component.onCancel, () => {
            this.visible = false
            this.$refs._component.$emit('close', this.$refs._component)
            this.$refs._component.$emit('cancel', this.$refs._component)
            dialogInstance.$destroy()
          })
        },
        handleOk() {
          handle(this.$refs._component.onOK || this.$refs._component.onOk, () => {
            this.visible = false
            this.$refs._component.$emit('close', this.$refs._component)
            this.$refs._component.$emit('ok', this.$refs._component)
            dialogInstance.$destroy()
          })
        }
      },
      render: function(h) {
        const that = this
        const modalModel = modalProps && modalProps.model
        if (modalModel) {
          delete modalProps.model
        }
        const ModalProps = Object.assign({}, modalModel && { model: modalModel } || {}, {
          attrs: Object.assign({}, {
            ...(modalProps.attrs || modalProps)
          }, {
            visible: this.visible
          }),
          on: Object.assign({}, {
            ...(modalProps.on || modalProps)
          }, {
            ok: () => {
              that.handleOk()
            },
            cancel: () => {
              that.handleClose()
            }
          })
        })
        const componentModel = componentProps && componentProps.model
        if (componentModel) {
          delete componentProps.model
        }
        const ComponentProps = Object.assign({}, componentModel && { model: componentModel } || {}, {
          ref: '_component',
          attrs: Object.assign({}, {
            ...((componentProps && componentProps.attrs) || componentProps)
          }),
          on: Object.assign({}, {
            ...((componentProps && componentProps.on) || componentProps)
          })
        })
        return h(Modal, ModalProps, [h(component, ComponentProps)])
      }
    }).$mount(dialogDiv)
  }
  Object.defineProperty(Vue.prototype, '$dialog', {
    get: () => {
      return function() {
        dialog.apply(this, arguments)
      }
    }
  })
}
