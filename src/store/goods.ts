import { defineStore } from 'pinia'
import { getGoodsList,searchGoods,deleteGoods,textGoods} from '@/api/goods'
import { ElMessage } from 'element-plus'
interface goodList{
  pagesize:number
  pagenum:number,
  query?:string
}
export const goodsStore = defineStore('goods', {
  persist: true,
  state: () => {
    return {
      goods:[] as any[],
      total:0
    }
  },
  actions: {
    async getGoodsList(data:goodList) {
      const res:any = await getGoodsList(data.pagenum,data.pagesize,data.query)
      const res1 = await textGoods(925)
      console.log(res1);

      if(res.meta.status === 200) {
        ElMessage.success('获取商品列表成功')
       this.goods = res.data.goods
       this.total = res.data.total
     }else {
       ElMessage.error('获取商品列表失败')
     }
    },
    async searchGoods(id:number) {
      const res:any = await searchGoods(id)
      console.log(res);
      if(res.meta.status === 200) {
      ElMessage.success('查询成功')
       this.goods = []
       this.goods.push(res.data)
       this.total = 1
     }else {
       ElMessage.error('查询失败请输入正确商品id')
     }
    },
    async deleteGoods(id:number) {
      const res: any = await deleteGoods(id)
      console.log(res);
      if(res.meta.status === 200) {
        ElMessage.success('删除成功')
       }else {
         ElMessage.error('删除失败')
       }
    }
  }
})
