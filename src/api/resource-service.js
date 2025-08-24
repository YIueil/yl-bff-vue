import request from '@/utils/request'

const resourceApi = {
  upload: '/resource/image/upload',
  listFile: '/resource/file/list',
  fileUpload: '/resource/file/upload',
  fileDelete: '/resource/file/download/{guid}',
  filePreview: '/resource/file/preview/{guid}'
}

export function imageUpload(formData) {
  return request({
    url: resourceApi.upload,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function listFile() {
  return request({
    url: resourceApi.listFile,
    method: 'get'
  })
}

export function previewFile(guid) {
  return request({
    url: resourceApi.filePreview.replace('{guid}', guid),
    method: 'get',
    responseType: 'blob'
  })
}

export default {
  resourceApi,
  imageUpload,
  previewFile,
  listFile
}
