<template>
  <div>
    <a-card
      :bordered="false"
      title="应用管理">
      <div slot="extra">
        <a-space>
          <a-button type="primary" icon="plus" @click="add">添加</a-button>
          <a-radio-group v-model="status">
            <a-radio-button value="all">全部</a-radio-button>
            <a-radio-button value="running">在线</a-radio-button>
            <a-radio-button value="waiting">离线</a-radio-button>
          </a-radio-group>
          <a-input-search @search="getListData" enter-button style="width: 272px"/>
        </a-space>
      </div>
      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in listData">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.iconUrl"/>
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a>详情</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item @click="edit(item)"><a>编辑</a></a-menu-item>
                <a-menu-item @click="del(item)"><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多
                <a-icon type="down"/>
              </a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <a-tag v-if="item.status === '在线'" color="#1DA57A">
                {{ item.status }}
              </a-tag>
              <a-tag v-else color="#F50">
                {{ item.status }}
              </a-tag>
            </div>
            <div class="list-content-item">
              <a-tag
                v-for="tag in ['张三', '李四']"
                :key="tag"
              >
                {{ tag }}
              </a-tag>
              <a-tag style="background: #fff; borderStyle: dashed;" @click="handleAddManager(item)">
                <a-icon type="plus" /> 添加
              </a-tag>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.progress?.value || 10" status="active"
                          style="width: 180px"/>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
    <form-modal
      :title="modal.title"
      :form-id="modal.formId"
      :visible="modal.visible"
      :model="modal.model"
      :form-items="modal.formItems"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
const data = []
data.push({
  title: 'Alipay',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  description: '那是一种内在的东西， 他们到达不了，也无法触及的',
  owner: '付晓晓',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 90
  }
})
data.push({
  title: 'Angular',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  owner: '曲丽丽',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 54
  }
})
import applicationService from '@/api/application-service'
import FormModal from '@/components/Modal/FormModal/Index'
import form from '@/utils/form'
import AddAbleTable from '@/views/application/ApplicationCenter/modal/AddAbleTable'

export default {
  name: 'ApplicationCenter',
  components: { FormModal },
  data() {
    return {
      listData: data,
      status: 'all',
      // 应用添加和编辑modal
      modal: {
        formId: 'applicationModal',
        visible: false,
        title: '',
        formItems: form.appAddForm,
        model: null
      }
    }
  },
  methods: {
    init() {
      this.getListData()
    },
    async getListData() {
      this.listData = await applicationService.getAllApplicationList()
    },
    handleAddManager(item) {
      console.log('添加应用管理员', item)
      const _this = this
      const applicationId = item.id
      this.$dialog(
        AddAbleTable,
        {
          appIds: [applicationId],
          async ok(ctl) {
            const userIds = ctl.selectedRows.map(row => row.id)
            await applicationService.addApplicationManager({
              applicationId: applicationId
            }, userIds)
            _this.$message.success('添加成功')
          },
          cancel() {
            console.log('onCancel')
          }
        },
        {
          title: '新增应用管理员',
          width: 700,
          centered: true,
          maskClosable: false
        }
      )
    },
    add() {
      this.$set(this.modal, 'title', '添加应用')
      this.$set(this.modal, 'formItems', form.appAddForm)
      this.$set(this.modal, 'visible', true)
    },
    edit(record) {
      this.$set(this.modal, 'title', '编辑应用')
      // 更新model的使用使用克隆对象, 触发model更新的监听
      this.$set(this.modal, 'model', this.cloneDeep(record))
      this.$set(this.modal, 'formItems', form.appEditForm)
      this.$set(this.modal, 'visible', true)
    },
    del(record) {
      console.log('删除', record)
    },
    async onSubmit(formData) {
      if (formData.id) {
        this.$message.success('应用修改成功')
      } else {
        await applicationService.addApplication(formData)
        this.$message.success('应用添加成功')
      }
      this.$set(this.modal, 'visible', false)
    },
    onCancel() {
      this.$set(this.modal, 'visible', false)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, .45);
  display: inline-block;
  font-size: 14px;
  margin-left: 40px;

  span {
    line-height: 20px;
  }

  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
