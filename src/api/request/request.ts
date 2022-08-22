import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { myRequestInterceptors, myRequestConfig } from './type'
// import { ElLoading } from 'element-plus'
// import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
class Request {
  instance: AxiosInstance
  interceptors?: myRequestInterceptors
  // loading?: LoadingInstance
  constructor(config: myRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        // this.loading = ElLoading.service({
        //   lock: true,
        //   text: '正在请求数据...',
        //   background: 'rgba(0, 0 ,0, 0.2)'
        // })
        return config
      },

      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // this.loading?.close()
        return res
      },
      (err) => {
        return err
      }
    )
  }
  request<T>(config: myRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
export default Request
