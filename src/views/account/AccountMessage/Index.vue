<template>
  <div class="page-header-wrapper">
    <a-list class="message-list" :loading="loading" item-layout="horizontal" :data-source="listData">
      <div v-if="showLoadingMore" slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore">
          loading more
        </a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">edit</a>
        <a slot="actions">more</a>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team">
          <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
          <a-avatar slot="avatar" src="https://s2.loli.net/2024/01/19/7WDJr9RLxuiPeZQ.jpg" />
        </a-list-item-meta>
        <div>content</div>
      </a-list-item>
    </a-list>
  </div>

</template>

<script>
import { searchPage } from '@/api/commmon-service'
import QueryParam from '@/models/QueryParam'
import { userMixin } from '@/store/mixin/user-mixin'

export default {
  name: 'AccountMessage',
  components: {},
  mixins: [userMixin],
  props: {},
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      listData: [],
      pagination: {
        pageSize: 10,
        pageIndex: 1
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      this.loading = true
      this.getData()
      this.loading = false
    },
    getParams() {
      return {
        userId: this.userInfo.id,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }
    },
    async getData() {
      const params = this.getParams()
      const result = await searchPage(params, new QueryParam(null, 'message.xml', 'getMessageList', params, null))
      if (result.list && result.list.length > 0) {
        this.listData = this.listData.concat(result.list)
        this.pagination.total = result.itemCounts
      } else {
        this.showLoadingMore = false
      }
    },
    async onLoadMore() {
      this.loadingMore = true
      this.pagination.pageIndex++
      await this.getData()
      this.loadingMore = false
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.page-header-wrapper {
  padding: 10px;
  .message-list {
    min-height: 700px;
    background: #FFFFFF;
  }
}

</style>
