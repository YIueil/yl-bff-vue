<template>
  <div class="layoutButton">
    <span class="sider" v-if="hasSider"></span>
    <span class="content">
      <span class="header"/>
      <span class="content"/>
      <span class="footer" v-if="hasFooter"/>
    </span>
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
    }
  }
}
</script>

<style lang="less" scoped>
.layoutButton {
  width: 108px;
  height: 54px;
  display: flex;
  .sider {
    background: #0a84ff;
    height: 100%;
    width: 25%;
  }
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    .header{
      width: 100%;
      height: 20%;
      background: #4585c7;
    }
    .content {
      width: 100%;
      height: 60%;
      background: #83aad5;
    }
    .footer {
      width: 100%;
      height: 20%;
      background: #4585c7;
    }
  }
}
</style>
