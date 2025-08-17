import axiosClient from './axiosClient'

const url = '/upload'
export const uploadApi = {
  upload(body) {
    return axiosClient.post(url, body)
  },
}
