import axiosClient from './axiosClient'

const url = '/posts'

export const postApi = {
  getAll(params) {
    return axiosClient.get(url, { params })
  },
  getById(id) {
    return axiosClient.get(`${url}/${id}`)
  },
  create(body) {
    return axiosClient.post(url, body)
  },
  update(id, body) {
    return axiosClient.put(`${url}/${id}`, body)
  },
  remove(id) {
    return axiosClient.delete(`${url}/${id}`)
  },
}
