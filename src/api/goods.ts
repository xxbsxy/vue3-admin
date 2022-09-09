import myRequest from './api'
interface PutGoodsRule{
  goods_name: string,
  goods_price: number,
  goods_weight: number,
  goods_number: number,
  goods_cat: string,
  goods_introduce?: string,
  pics?:object,
  attrs?:Array<string>
}
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
export function putGoods(data:PutGoodsRule) {
  return myRequest.request({
    url: '/goods',
    method:'post',
    data
  })
}

