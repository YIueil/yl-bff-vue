<template>
  <div>
    <a-list
        itemLayout="horizontal"
        :dataSource="listData"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>
    <form-modal
        :visible="passwordForm.visible"
        :title="passwordForm.title"
        :form-id="passwordForm.formId"
        :formItems="passwordForm.formItems"
        @submit="handlePasswordChangeSubmit"
        @cancel="handlePasswordChangeCancel"
    />
    <form-modal
      :visible="phoneNumberForm.visible"
      :title="phoneNumberForm.title"
      :form-id="phoneNumberForm.formId"
      :formItems="phoneNumberForm.formItems"
      @submit="handlePhoneNumberChangeSubmit"
      @cancel="handlePhoneNumberChangeCancel"
    />
  </div>
</template>

<script>
import formModal from '@/components/Modal/FormModal/Index'
import form from '@/utils/form'
import userService from '@/api/user-service'

export default {
  name: 'SecuritySetting',
  components: {
    formModal
  },
  props: {},
  data() {
    return {
      listData: [
        {
          title: '密码',
          description: '密码安全性',
          value: '强',
          actions: {
            title: '修改', callback: () => {
              this.passwordForm.visible = true
            }
          }
        },
        {
          title: '绑定手机号',
          description: '当前绑定手机',
          value: '155****2580',
          actions: {
            title: '修改', callback: () => {
              this.phoneNumberForm.visible = true
            }
          }
        },
        {
          title: '绑定邮箱',
          description: '当前绑定邮箱',
          value: 'yi**il@163.com',
          actions: {
            title: '修改', callback: () => {
              this.$message.warning('This is message of warning')
            }
          }
        }
      ],
      passwordForm: {
        visible: false,
        title: '修改密码',
        formId: 'passwordForm',
        formItems: form.passwordChangeForm
      },
      phoneNumberForm: {
        visible: false,
        title: '修改手机',
        formId: 'phoneNumberForm',
        formItems: form.phoneNumberForm
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    handlePasswordChangeSubmit({ oldPassword, newPassword, reNewPassword }) {
      if (newPassword !== reNewPassword) {
        this.$message.warning('两次新密码输入不一致')
        return
      }
      userService.passwordChange({
        oldPassword,
        newPassword
      }).then(() => {
        this.$message.success('密码修改成功')
        this.$set(this.passwordForm, 'visible', false)
      }).catch(({ message }) => {
        const { tips } = JSON.parse(message)
        this.$message.error(tips)
      })
    },
    handlePasswordChangeCancel() {
      this.$set(this.passwordForm, 'visible', false)
    },
    handlePhoneNumberChangeSubmit({ newPhoneNumber }) {
      userService.phoneNumberChange({ newPhoneNumber }).then(() => {
        this.$message.success('手机号修改成功')
        this.$set(this.phoneNumberForm, 'visible', false)
      }).catch(({ message }) => {
        const { tips } = JSON.parse(message)
        this.$message.error(tips)
      })
    },
    handlePhoneNumberChangeCancel() {
      this.$set(this.phoneNumberForm, 'visible', false)
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
