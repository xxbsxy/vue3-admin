import myRequest from './api'

export function getGoodsList(pagenum:number,pagesize:number,query?:string) {
  return myRequest.request({
    url: '/goods',
    params:{
      pagesize,
      pagenum,
      query
    }
  })
}
export function searchGoods(id:number) {
  return myRequest.request({
    url: `/goods/${id}`,
  })
}
export function deleteGoods(id:number) {
  return myRequest.request({
    url: `/goods/${id}`,
    method:'delete'
  })
}

