<template>
  <div class="layoutButton" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="sider" v-if="hasSider"></div>
    <div class="content" :style="{ width: hasSider ? '70%' : '90%' }">
      <div class="header"></div>
      <div class="main" :style="{ height: hasFooter ? '58%' : '78%' }"></div>
      <div class="footer" v-if="hasFooter"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutButton',
  props: {
    layoutType: {
      type: String,
      default: () => {
        return 'basicLayout'
      }
    },
    hasFooter: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    hasSider: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    width: {
      type: Number,
      default: 108
    },
    height: {
      type: Number,
      default: 54
    }
  }
}
</script>

<style lang="less" scoped>
@import '/src/assets/style/theme/default.less';

.layoutButton {
  display: flex;
  justify-content: space-around;
  padding: 1px;
  .sider {
    background: @primary-6;
    height: 100%;
    width: 25%;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .header{
      width: 100%;
      height: 20%;
      background: @primary-5;
    }
    .main {
      width: 100%;
      background: @primary-4;
    }
    .footer {
      width: 100%;
      height: 20%;
      background: @primary-5;
    }
  }
}
.layoutButton:hover {
  cursor: pointer;
  box-shadow: 0 0 10px @primary-color;
}
</style>
