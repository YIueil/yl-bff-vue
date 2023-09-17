<template>
  <div class="template-login-page">
    极简登陆页<br>
    <input type="text" v-model="loginName"/><br>
    <input type="password" v-model="password"/><br>
    <button @click="login">登陆</button>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  components: {},
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
}
</style>
