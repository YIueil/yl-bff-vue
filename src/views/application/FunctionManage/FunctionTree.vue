<template>
  <a-card :bordered="false" class="role-ctrl">
    <template slot="title">
      <a-space class="action-wrapper">
        <a-space>
          所属应用
          <a-select style="min-width: 120px">
            <a-select-option v-for="application in manageApplications" :key="application.id" :value="application.id">
              {{ application.name }}
            </a-select-option>
          </a-select>
        </a-space>
        <a-space>
          <a-button type="primary" icon="plus" @click="handleAddFunction">新增</a-button>
          <a-button type="default" icon="edit" @click="handleEditFunction">编辑</a-button>
          <a-button type="danger" icon="delete" :disabled="selectNode === null" @click="handleDeleteFunction">删除</a-button>
        </a-space>
      </a-space>
    </template>
  </a-card>
</template>

<script>
import QueryParam from '@/models/QueryParam'
import { searchPage } from '@/api/commmon-service'
import { mapGetters } from 'vuex'
export default {
  name: 'FunctionTree',
  components: {},
  props: {},
  data() {
    return {
      manageApplications: [],
      selectNode: null
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  methods: {
    init() {
      this.getManageApplicationList()
    },
    async getManageApplicationList() {
      const params = {
        pageIndex: 1,
        pageSize: 9999
      }
      const result = await searchPage(params, new QueryParam(null, 'application.xml', 'getManageApplicationList', {
        userId: this.userInfo.id
      }, null))
      if (result.body) {
        this.manageApplications = result.body
      }
    },
    handleAddFunction() {

    },
    handleEditFunction() {

    },
    handleDeleteFunction() {

    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.role-ctrl {
  min-height: 600px;
}
</style>
