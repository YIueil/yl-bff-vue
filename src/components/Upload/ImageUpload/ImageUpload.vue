<template>
  <div class="image-upload-div" :style="sizeStyle"
       @click="onClick">
    <div class="mask" :style="sizeStyle">
      <a-icon type="plus"/>
    </div>
    <img :style="sizeStyle" :src="previewUrl" alt="头像"/>
    <cropper-modal :crop-width="width" :crop-height="height" :radius="radius" ref="modal" @ok="onCutOk"/>
  </div>
</template>

<script>
import CropperModal from '@/components/Modal/CropperModal/Index'

export default {
  name: 'ImageUpload',
  components: {
    CropperModal
  },
  props: {
    width: {
      type: Number,
      default: () => 50
    },
    height: {
      type: Number,
      default: () => 50
    },
    radius: {
      type: Number,
      default: () => 50
    },
    defaultPreviewUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      sizeStyle: {
        'width': `${this.width}px`,
        'height': `${this.height}px`,
        'border-radius': `${this.radius}%`
      },
      previewUrl: this.defaultPreviewUrl
    }
  },
  computed: {},
  watch: {},
  methods: {
    onClick() {
      this.$refs.modal.edit(1)
    },
    onCutOk(resp) {
      this.previewUrl = resp.url
      this.$emit('onCutOk', resp)
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.image-upload-div {
  position: relative;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0 4px #ccc;

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img, .mask {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
