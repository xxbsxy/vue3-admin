import { defineStore } from 'pinia'
import { getCategories, deleteCategories ,putCategories,addCategories} from '@/api/categories'
import { ElMessage } from 'element-plus'
interface PutCategoriesRule {
  id:number,
  name:string
}
interface addCategoriesRule {
  cat_pid:number,
  cat_name:string,
  cat_level:number
}
export const cateroriesStore = defineStore('caterories', {
  // persist: true,
  state: () => {
    return {
      categories: [] as any[],
      categoriesType: [] as any[],
      loading:false
    }
  },
  actions: {
    async getCategories() {
      this.loading = true
      const res: any = await getCategories()
      this.categories = res.data
      this.loading = false
    },
    async getCategoriesType() {
      const res: any = await getCategories(2)
      this.categoriesType = res.data
    },
    async deleteCategories(id: number) {
      const res: any = await deleteCategories(id)
      if (res.meta.status === 200) {
        ElMessage.success('删除成功')
      } else {
        ElMessage.error('删除失败')
      }
    },
    async putCategories(data:PutCategoriesRule) {
      const res: any = await putCategories(data.id,data.name)
      if (res.meta.status === 200) {
        ElMessage.success('更新成功')
      } else {
        ElMessage.error('更新失败')
      }
    },
    async addCategories(data:addCategoriesRule) {
     const res:any = await addCategories(data.cat_pid,data.cat_name,data.cat_level)
     if (res.meta.status === 201) {
      ElMessage.success('添加分类成功')
    } else {
      ElMessage.error('添加分类失败')
    }
    }
  }
})
