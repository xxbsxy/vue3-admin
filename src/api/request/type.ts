import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface myRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
export interface myRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: myRequestInterceptors<T>
}
