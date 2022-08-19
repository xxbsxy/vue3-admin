import { defineStore } from 'pinia'
import { getGoodsList} from '@/api/goods'
import { ElMessage } from 'element-plus'
interface goodList{
  pagesize:number
  pagenum:number
}
export const goodsStore = defineStore('goods', {
  persist: true,
  state: () => {
    return {
      goods:[],
      total:0
    }
  },
  actions: {
    async getGoodsList(data:goodList) {
      const res:any = await getGoodsList(data.pagenum,data.pagesize)
      if(res.meta.status === 200){
        ElMessage.success('获取商品列表成功')
       this.goods = res.data.goods
       this.total = res.data.total
     }else {
       ElMessage.error('获取商品列表失败')
     }
    }
  }
})
