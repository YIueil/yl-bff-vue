<template>
  <div class="account-center">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="userInfo.avatarUrl" alt="头像">
            </div>
            <div class="username">{{ userInfo.userName }}</div>
            <div class="bio">{{ userInfo.signature }}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title"></i>交互专家
            </p>
            <p>
              <i class="group"></i>蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED
            </p>
            <p>
              <i class="address"></i>
              <span>浙江省</span>
              <span>杭州市</span>
            </p>
          </div>
          <a-divider/>
          <div class="account-center-link">
            <div class="title">链接</div>
            <a-spin :spinning="linkSpinning">
              <div class="members">
                <a-row>
                  <a-col :span="12" v-for="(link, index) in linkList" :key="index">
                    <a>
                      <a-icon :type="link.icon"/>
                      <span class="member">{{ link.name }}</span>
                    </a>
                  </a-col>
                </a-row>
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabList"
          :activeTabKey="activeTabKey"
          @tabChange="handleTabChange"
        >
          <AppPage v-if="activeTabKey === 'app'"/>
          <BlogPage v-else-if="activeTabKey === 'blog'"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { userMixin } from '@/store/mixin/user-mixin'
import AppPage from '@/views/account/AccountTabs/AppPage'
import BlogPage from '@/views/account/AccountTabs/BlogPage'

export default {
  name: 'AccountCenter',
  mixins: [userMixin],
  components: { BlogPage, AppPage },
  props: {},
  data() {
    return {
      linkSpinning: true,
      linkList: [],
      tabList: [{
        key: 'app',
        tab: '应用'
      },
      {
        key: 'blog',
        tab: '文章'
      }],
      activeTabKey: 'app'
    }
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      setTimeout(() => {
        this.linkList = [{
          icon: 'github',
          name: 'GitHub',
          url: 'https://github.com/YIueil'
        }, {
          icon: 'mail',
          name: 'YIueil@163.com',
          url: 'YIueil@163.com'
        }, {
          icon: 'phone',
          name: '1550****2580',
          url: ''
        }, {
          icon: 'google',
          name: 'l511210125@gmail.com',
          url: 'l511210125@gmail.com'
        }]
        this.linkSpinning = false
      }, 1000)
    },
    handleTabChange(key) {
      this.activeTabKey = key
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.account-center {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }

    .group {
      background-position: 0 -22px;
    }

    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-link {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;

        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }

        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .title {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
