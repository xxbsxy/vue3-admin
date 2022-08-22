import myRequest from './api'

export function getOrders(pagenum:number,pagesize:number) {
  return myRequest.request({
    url: '/orders',
    params:{
      pagenum,
      pagesize
    }
  })
}
export function editOrders(id:number,order_price:number, is_send?:number,order_pay?:number) {
  return myRequest.request({
    url: `/orders/${id}`,
    method:'put',
    data:{
      order_price,
      is_send,
      order_pay
    }
  })
}

