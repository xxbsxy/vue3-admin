import { defineStore } from 'pinia'
import { getGoodsList, searchGoods, deleteGoods, putGoods } from '@/api/goods'
import { getCategories } from '@/api/categories'
import { ElMessage } from 'element-plus'
interface goodList {
  pagesize: number
  pagenum: number,
  query?: string
}
interface PutGoodsRule {
  goods_name: string,
  goods_price: number,
  goods_weight: number,
  goods_number: number,
  goods_cat: string,
  goods_introduce?: string,
  pics?: object,
  attrs?: Array<string>
}
export const goodsStore = defineStore('goods', {
  // persist: true,
  state: () => {
    return {
      goods: [] as any[],
      total: 0,
      loading: false,
      categories: [] as any[],
    }
  },
  actions: {
    async getGoodsList(data: goodList) {
      this.loading = true
      const res: any = await getGoodsList(data.pagenum, data.pagesize, data.query)
      if (res.meta.status === 200) {
        ElMessage.success('获取商品列表成功')
        this.goods = res.data.goods
        this.total = res.data.total
      } else {
        ElMessage.error('获取商品列表失败')
      }
      this.loading = false
    },
    async searchGoods(id: number) {
      const res: any = await searchGoods(id)
      console.log(res);
      if (res.meta.status === 200) {
        ElMessage.success('查询成功')
        this.goods = []
        this.goods.push(res.data)
        this.total = 1
      } else {
        ElMessage.error('查询失败请输入正确商品id')
      }
    },
    async deleteGoods(id: number) {
      const res: any = await deleteGoods(id)
      console.log(res);
      if (res.meta.status === 200) {
        ElMessage.success('删除成功')
      } else {
        ElMessage.error('删除失败')
      }
    },
    async getCategories() {
      const res: any = await getCategories()
      this.categories = res.data
    },
    async putGoods(data: PutGoodsRule) {
      const res: any = await putGoods(data)
      console.log(res);

      if (res.meta.status === 201) {
        ElMessage.success('创建商品成功')
      } else {
        ElMessage.error(res.meta.msg)
      }
    }
  }
})
