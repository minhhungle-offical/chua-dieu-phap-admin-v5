import axiosClient from './axiosClient'

const url = '/auth'

export const authApi = {
  getMe() {
    return axiosClient.get(`${url}/me`)
  },
  login(body) {
    return axiosClient.post(`${url}/login`, body)
  },
  resendOtp(body) {
    return axiosClient.post(`${url}/resend-otp`, body)
  },
  verifyOtp(body) {
    return axiosClient.post(`${url}/verify-otp`, body)
  },
  updateMe(body) {
    return axiosClient.put(`${url}/me`, body)
  },
}
