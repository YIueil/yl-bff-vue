<template>
  <BreadcrumbLayout>
    <div class="template-login-page">
      <input type="text" v-model="loginName"/><br>
      <input type="password" v-model="password"/><br>
      <button @click="login">登陆</button>
    </div>
  </BreadcrumbLayout>

</template>

<script>

import { mapActions } from 'vuex'
import BreadcrumbLayout from '@/layouts/component/BreadcrumbLayout'

export default {
  name: 'LoginView',
  components: { BreadcrumbLayout },
  props: {},
  data() {
    return {
      loginName: 'YIueil',
      password: 'Fk12345.'
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(['Login']),
    async login() {
      await this.Login({
        loginName: this.loginName,
        password: this.password
      })
      await this.$router.push({ path: '/' })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.template-login-page {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
