import { defineStore } from 'pinia'
import { getRightsList} from '@/api/rights'
import { ElMessage } from 'element-plus'

export const rightStore = defineStore('right', {
  persist: true,
  state: () => {
    return {
      rights:[]
    }
  },
  actions: {
    async getRightsList() {
      const res:any = await getRightsList()
      if(res.meta.status === 200){
        ElMessage.success('获取权限列表成功')
        this.rights = res.data
     }else {
       ElMessage.error('获取权限列表失败')
     }
    }
  }
})
