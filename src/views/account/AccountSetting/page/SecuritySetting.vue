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
    <form-modal
      :visible="mailForm.visible"
      :title="mailForm.title"
      :form-id="mailForm.formId"
      :formItems="mailForm.formItems"
      @submit="handleMailChangeSubmit"
      @cancel="handleMailChangeCancel"
    />
  </div>
</template>

<script>
import formModal from '@/components/Modal/FormModal/Index'
import form from '@/utils/form'
import userService from '@/api/user-service'
import { appMixin } from '@/store/mixin/app-mixin'
import { userMixin } from '@/store/mixin/user-mixin'
import { mapActions } from 'vuex'

export default {
  name: 'SecuritySetting',
  mixins: [appMixin, userMixin],
  components: {
    formModal
  },
  props: {},
  data() {
    return {
      listData: [],
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
      },
      mailForm: {
        visible: false,
        title: '修改手机',
        formId: 'phoneNumberForm',
        formItems: form.mailForm
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(['Refresh']),
    async init() {
      const { passwordStrengthLevel, expectedCrackingTime } = await userService.getAccountSecurityLevel()
      this.listData = [
        {
          title: '密码',
          description: '密码安全性',
          value: `${passwordStrengthLevel} ${expectedCrackingTime}`,
          actions: {
            title: '修改', callback: async() => {
              this.passwordForm.visible = true
            }
          }
        },
        {
          title: '绑定手机号',
          description: '当前绑定手机',
          value: this.userInfo.phoneNumber,
          actions: {
            title: '修改', callback: async() => {
              this.phoneNumberForm.visible = true
            }
          }
        },
        {
          title: '绑定邮箱',
          description: '当前绑定邮箱',
          value: this.userInfo.email,
          actions: {
            title: '修改', callback: () => {
              this.$confirm({
                title: '确认要修改邮件地址? 确认将发送修改操作的验证码发送到原邮件!',
                onOk: async() => {
                  try {
                    await userService.sendMailChangeVerifyCode()
                    this.$message.success('邮件已发送')
                    this.mailForm.visible = true
                  } catch ({ message }) {
                    const { tips } = JSON.parse(message)
                    this.$message.error(tips)
                  }
                }
              })
            }
          }
        }
      ]
    },
    handlePasswordChangeSubmit({ oldPassword, newPassword, reNewPassword }) {
      if (newPassword !== reNewPassword) {
        this.$message.warning('两次新密码输入不一致')
        return
      }
      userService.passwordChange({
        oldPassword,
        newPassword
      }).then(async() => {
        await this.Refresh()
        await this.init()
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
      userService.phoneNumberChange({ newPhoneNumber }).then(async() => {
        await this.Refresh()
        await this.init()
        this.$message.success('手机号修改成功')
        this.$set(this.phoneNumberForm, 'visible', false)
      }).catch(({ message }) => {
        const { tips } = JSON.parse(message)
        this.$message.error(tips)
      })
    },
    handlePhoneNumberChangeCancel() {
      this.$set(this.phoneNumberForm, 'visible', false)
    },
    async handleMailChangeSubmit({ verifyCode, newMailAddress }) {
      console.log('handleMailChangeSubmit', verifyCode, newMailAddress)
      try {
        await userService.sendMailChangeLink({
          newMailAddress,
          verifyCode
        })
        this.$message.success('修改请求已受理, 请在新邮件中点击链接进行确认!')
        this.$set(this.phoneNumberForm, 'visible', false)
      } catch ({ message }) {
        const { tips } = JSON.parse(message)
        this.$message.error(tips)
      }
    },
    handleMailChangeCancel() {
      this.$set(this.mailForm, 'visible', false)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
