import { defineStore } from 'pinia'
import { getCategories } from '@/api/categories'
import { ElMessage } from 'element-plus'
export const paramsStore = defineStore('params', {
  persist: true,
  state: () => {
    return {
      categories: [] as any[],
    }
  },
  actions: {
    async getCategories() {
      const res: any = await getCategories()
      this.categories = res.data
    },
  }
})
