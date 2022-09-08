import { defineStore } from 'pinia'
import { getOrders ,editOrders} from '@/api/orders'
import { ElMessage } from 'element-plus'
interface orderList {
  pagenum:number,
  pagesize:number
}
interface editOrder {
  id:number,
  order_price:number,
  is_send?:number,
  order_pay?:number
}
export const ordersStore = defineStore('orders', {
  persist: true,
  state: () => {
    return {
      orders:[],
      total:0
    }
  },
  actions: {
    async getOrders(data:orderList) {
     const res:any = await getOrders(data.pagenum,data.pagesize)
     this.orders = res.data.goods
     this.total = res.data.total

    },
    async editOrders(data:editOrder) {
     const res:any = await editOrders(data.id,data.order_price,data.is_send,data.order_pay)
     if(res.meta.status === 201){
      ElMessage.success('更新订单成功')
    }else {
     ElMessage.error('更新订单失败')
   }
    }
  }
})
