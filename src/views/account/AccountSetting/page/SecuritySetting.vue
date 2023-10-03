<template>
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
</template>

<script>
export default {
  name: 'SecuritySetting',
  components: {},
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
              this.$message.info('This is a normal message')
            }
          }
        },
        {
          title: '绑定手机号',
          description: '当前绑定手机',
          value: '155****2580',
          actions: {
            title: '修改', callback: () => {
              this.$message.success('This is a message of success')
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
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
