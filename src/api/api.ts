import Request from './request/request'

const myRequest = new Request({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000,
  interceptors: {
    requestInterceptor: (config) => {
      // const token = ''
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default myRequest
