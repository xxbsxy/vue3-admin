import Request from './request/request'
import LocalCache from '../utils/cache'
const myRequest = new Request({
  // baseURL: '/api',
  baseURL: 'http://43.142.179.253:8889/api/private/v1',
  timeout: 5000,
  interceptors: {
    requestInterceptor: (config: any) => {
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `${token}`
      }
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
