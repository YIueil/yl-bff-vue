<template>
  <a-list
    class="message-list"
    :loading="loading"
    item-layout="horizontal"
    :data-source="data"
  >
    <div
      v-if="showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore"/>
      <a-button v-else @click="onLoadMore">
        loading more
      </a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item">
      <a slot="actions">edit</a>
      <a slot="actions">more</a>
      <a-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
        <a-avatar
          slot="avatar"
          src="https://s2.loli.net/2024/01/19/7WDJr9RLxuiPeZQ.jpg"
        />
      </a-list-item-meta>
      <div>content</div>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: 'AccountMessage',
  components: {},
  props: {},
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getData(callback) {
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            results: [{
              'gender': 'female',
              'name': {
                'title': 'Mrs',
                'first': 'li',
                'last': 'si'
              },
              'email': 'dyn.zraay@example.com',
              'nat': 'IR'
            }]
          })
        }, 1000)
      }).then(res => {
        callback(res)
      })
    },
    onLoadMore() {
      this.loadingMore = true
      this.getData(res => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }
  },
  mounted() {
    this.getData(res => {
      this.loading = false
      this.data = res.results
    })
  }
}
</script>

<style scoped>
.message-list {
  min-height: 700px;
  background: #FFFFFF;
}
</style>
