<template>
  <!-- 考虑使用viewerjs https://fengyuanchen.github.io/viewerjs/ -->
  <img :src="src" alt=""/>
</template>

<script>
export default {
  name: 'ImageViewer',
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>
