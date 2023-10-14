<template>
  <iframe :src="`/plugins/PDFJS/web/viewer.html?${src}`" />
</template>

<script>
export default {
  name: 'PdfViewer',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
