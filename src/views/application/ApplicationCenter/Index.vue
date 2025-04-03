<template>
  <div class="page-header-wrapper">
    <a-card
      :bordered="false"
      title="应用管理">
      <div slot="extra">
        <a-space>
          <a-button type="primary" icon="plus" @click="add" v-action:新增>新增</a-button>
          <a-radio-group v-model="status">
            <a-radio-button :value="null">全部</a-radio-button>
            <a-radio-button value="在线">在线</a-radio-button>
            <a-radio-button value="离线">离线</a-radio-button>
          </a-radio-group>
          <a-input-search @search="getListData" enter-button style="width: 272px"/>
        </a-space>
      </div>
      <a-list size="large" :pagination="pagination">
        <a-list-item :key="index" v-for="(item, index) in listData">
          <a-list-item-meta :description="item.description">
            <img slot="avatar" class="projectIconUrl" :src="item.iconUrl" alt="projectIcon"/>
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
              <a-tag v-if="item.status === '在线'" @click="applicationStatusUpdate(item.id, '离线')" color="#1DA57A">
                {{ item.status }}
              </a-tag>
              <a-tag v-else color="#F50" @click="applicationStatusUpdate(item.id, '在线')">
                {{ item.status }}
              </a-tag>
            </div>
            <div class="list-content-item">
              <a-tag
                v-for="tag in item.applicationManager?.split(',')"
                :key="tag"
              >
                {{ tag }}
              </a-tag>
              <a-tag style="background: #fff; borderStyle: dashed;" @click="handleAddManager(item)" v-action:新增应用管理员>
                <a-icon type="plus"/>
                添加
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
      @cancel="onCancel">
      <template v-if="modal.visible" #iconUrl>
        <ImageUpload :defaultPreviewUrl="modal?.model?.iconUrl || initApplicationImage()" :radius="5" :width="108"
                     :height="54" @onCutOk="resp => setIconUrl(resp, modal)"/>
      </template>
    </form-modal>
  </div>
</template>
<script>
import applicationService from '@/api/application-service'
import FormModal from '@/components/Modal/FormModal/Index'
import form from '@/utils/form'
import AddAbleTable from '@/views/application/ApplicationCenter/modal/AddAbleTable'
import ImageUpload from '@/components/Upload/ImageUpload/ImageUpload'
import { searchPage } from '@/api/commmon-service'
import QueryParam from '@/models/QueryParam'

export default {
  name: 'ApplicationCenter',
  components: { ImageUpload, FormModal },
  data() {
    return {
      listData: [],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 4,
        pageIndex: 1,
        total: 50,
        onChange: (page, pageSize) => {
          console.log('onChange', page, pageSize)
          this.pagination.pageSize = pageSize
          this.pagination.pageIndex = page
        },
        onShowSizeChange: (current, size) => {
          console.log('onShowSizeChange', current, size)
          this.pagination.pageSize = size
        }
      },
      status: null,
      // 应用添加和编辑modal
      modal: {
        formId: 'applicationModal',
        visible: false,
        title: '',
        formItems: form.appAddForm
      }
    }
  },
  watch: {
    'pagination.pageIndex'() {
      this.getListData()
    },
    'pagination.pageSize'() {
      this.getListData()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    add() {
      this.$set(this.modal, 'title', '添加应用')
      this.$set(this.modal, 'formItems', form.appAddForm)
      // 使得获取到默认图片
      this.$set(this.modal, 'model', {})
      this.$set(this.modal, 'visible', true)
    },
    async applicationStatusUpdate(applicationId, status) {
      try {
        await applicationService.updateApplicationStatus({
          applicationId,
          status
        })
        await this.getListData()
      } catch (e) {
        this.$message.error(e)
      }
    },
    async del(record) {
      console.log('删除', record)
      await applicationService.delApplication({
        applicationId: record.id
      })
      this.$message.success('删除成功')
      this.refresh()
    },
    edit(record) {
      this.$set(this.modal, 'title', '编辑应用')
      // 更新model的使用使用克隆对象, 触发model更新的监听
      this.$set(this.modal, 'model', this.cloneDeep(record))
      this.$set(this.modal, 'formItems', form.appEditForm)
      this.$set(this.modal, 'visible', true)
    },
    async getListData(filterString) {
      const params = this.getParams(filterString)
      const result = await searchPage(params, new QueryParam(null, 'application.xml', 'getApplicationList', params, null))
      if (result.list) {
        this.listData = result.list
        this.pagination.total = result.itemCounts
      }
    },
    getParams(filterString) {
      const params = {
        pageSize: this.pagination.pageSize,
        pageIndex:  this.pagination.pageIndex
      }
      if (this.status) {
        params.status = this.status
      }
      if (filterString) {
        params.filterString = filterString
      }
      return params
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
    init() {
      this.getListData()
    },
    initApplicationImage() {
      const iconUrl = require('@/assets/img/default-project.jpg')
      this.modal.model.iconUrl = iconUrl
      return iconUrl
    },
    onCancel() {
      this.$set(this.modal, 'visible', false)
      this.$set(this.modal, 'model', {})
    },
    async onSubmit(formData) {
      if (formData.id) {
        await applicationService.modifyApplication(formData)
        this.$message.success('应用修改成功')
        this.refresh()
      } else {
        await applicationService.addApplication(formData)
        this.$message.success('应用添加成功')
        this.refresh()
      }
      this.$set(this.modal, 'visible', false)
      this.$set(this.modal, 'model', {})
    },
    refresh() {
      this.getListData()
    },
    setIconUrl(response, modal) {
      console.log('图片上传结果', response)
      this.$set(modal.model, 'iconUrl', response.url)
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper {
  padding: 10px;
}

.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.projectIconUrl {
  width: 216px;
  height: 108px;
  border-radius: 2%;
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

.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}
</style>
