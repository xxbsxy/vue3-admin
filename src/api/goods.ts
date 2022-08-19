import myRequest from './api'

export function getGoodsList(pagenum:number,pagesize:number) {
  return myRequest.request({
    url: '/goods',
    params:{
      pagesize,
      pagenum
    }
  })
}
