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
export function textGoods(id:number) {
  return myRequest.request({
    url: `/goods/${id}`,
    method:'put',
    data:{
      goods_name:'aaa',
      goods_price:500,
      goods_number:200,
      goods_weight:3000,
      goods_introduce:'bbb'
    }
  })
}
