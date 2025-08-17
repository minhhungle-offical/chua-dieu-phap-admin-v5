import axios from 'axios'

const baseURL = 'http://localhost:3000/private/api' //`${import.meta.env.VITE_API_BASE_URL}/api`

export const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: automatically attach token if exists
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor: unwrap response data or return pagination if available
axiosClient.interceptors.response.use(
  (response) => {
    const responseData = response.data
    // If pagination exists, return full response, else return data property
    return responseData?.pagination ? responseData : responseData.data
  },
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message

    console.log({ message })

    if (typeof window !== 'undefined' && status === 401) {
      localStorage.removeItem('token')
      // Optional: redirect to login page
      // window.location.href = '/login'
    }

    return Promise.reject(new Error(message ?? 'Something went wrong.'))
  },
)

export default axiosClient
