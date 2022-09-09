import { reactive, ref } from 'vue'
import { ordersStore } from '@/store/orders'
export function useEditOrders( pageSize: number, pageNum: number) {
  const store = ordersStore()
  let editOrderdialogVisible = ref(false) //编辑对话框的显示
  //支付方式
  const pay = reactive([
    { state: 1, title: '未支付' },
    { state: 2, title: '支付宝' },
    { state: 3, title: '微信支付' },
    { state: 4, title: '银行卡' }
  ])
  //是否发货
  const send = reactive([
    { state: 0, title: '否' },
    { state: 1, title: '是' }
  ])
  //编辑权限表单
  const editOrderform = reactive({
    id: -1,
    order_price: '',
    is_send: '',
    order_pay: ''
  })
  //点击编辑按钮获得订单详情
  const getOrder = (row: any) => {
    editOrderform.id = row.order_id
    editOrderform.order_price = row.order_price
    editOrderform.is_send = row.is_send
    pay.forEach((item) => {
      if (item.state - 1 == row.order_pay) {
        editOrderform.order_pay = item.title
      }
    })
    editOrderdialogVisible.value = true
  }
  //点击确认按钮修改
  const editOrder = () => {
    pay.forEach((item) => {
      if (item.title == editOrderform.order_pay) {
        editOrderform.order_pay = String(item.state)
      }
    })
    send.forEach((item) => {
      if (item.title == editOrderform.is_send) {
        editOrderform.is_send = String(item.state)
      }
    })
    store
      .editOrders({
        id: Number(editOrderform.id),
        is_send: Number(editOrderform.is_send),
        order_price: Number(editOrderform.order_price),
        order_pay: Number(editOrderform.order_pay)
      })
      .then(() => {
        store.getOrders({ pagenum: pageNum, pagesize: pageSize })
      })
    editOrderdialogVisible.value = false
  }
  return {
    editOrderdialogVisible,
    editOrderform,
    getOrder,
    editOrder,
    pay,
    send
  }
}
