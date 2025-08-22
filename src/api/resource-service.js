import request from '@/utils/request'

const imageApi = {
  upload: '/resource/image/upload',
  fileUpload: '/resource/file/upload',
  fileDelete: '/resource/file/download/{guid}',
  filePreview: '/resource/file/preview/{guid}'
}

export function imageUpload(formData) {
  return request({
    url: imageApi.upload,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
