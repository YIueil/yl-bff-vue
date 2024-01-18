import request from '@/utils/request'

const imageApi = {
  upload: '/resource/image/upload'
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
