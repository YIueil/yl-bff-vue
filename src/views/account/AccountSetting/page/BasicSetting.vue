<template>
  <div>
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">
        <a-form layout="vertical">
          <a-form-item label="昵称">
            <a-input v-model="form.userName"/>
          </a-form-item>
          <a-form-item label="个性签名">
            <a-textarea v-model="form.signature" rows="4"/>
          </a-form-item>
          <a-form-item label="邮箱" :required="false">
            <a-input v-model="form.email" placeholder="template@mail.com"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="submitChange">提交信息变更</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus"/>
          </div>
          <img :src="form.avatarUrl" alt="头像"/>
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="modal" @ok="setAvatar"/>
  </div>
</template>

<script>
import { appMixin } from '@/store/mixin/app-mixin'
import { userMixin } from '@/store/mixin/user-mixin'
import AvatarModal from '@/components/Modal/AvatarModal/Index'
import userService from '@/api/user-service'
import { mapMutations } from 'vuex'

export default {
  name: 'BasicSetting',
  mixins: [appMixin, userMixin],
  components: {
    AvatarModal
  },
  props: {},
  data() {
    return {
      form: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(['SET_USER_INFO']),
    setAvatar(response) {
      console.log('更新头像', response)
      this.form.avatarUrl = response.url
    },
    async submitChange() {
      const modifyUser = await userService.modifyUser(this.form)
      this.SET_USER_INFO(modifyUser)
      this.$message.success('修改成功')
    }
  },
  mounted() {
    this.form = this.cloneDeep(this.userInfo)
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img, .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
