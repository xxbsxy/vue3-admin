import { defineStore } from 'pinia'
import { getCategories } from '@/api/categories'
import { getAttributes, addAttributes,deleteAttributes ,putAttributes} from '@/api/params'
import { ElMessage } from 'element-plus'
interface GetAttributesRule {
  id: number,
  sel: Array<string>
}
interface AddAttributesRule {
  id: number,
  attr_sel: Array<string>,
  attr_name: string,
  attr_vals?: string
}
interface PutAttributesRule{
  id:number,
  attrid:number,
  attr_sel:Array<string>,
  attr_name:string,
  attr_vals?:string
}
export const paramsStore = defineStore('params', {
  state: () => {
    return {
      categories: [] as any[],
      attributesMany: [] as any[],
      attributesOnly: [] as any[]
    }
  },
  actions: {
    async getCategories() {
      const res: any = await getCategories()
      this.categories = res.data
    },
    async getAttributes(data: GetAttributesRule) {
      const res: any = await getAttributes(data.id, data.sel)
      if (data.sel[0] === 'many') {
        this.attributesMany = res.data
      } else {
        this.attributesOnly = res.data
      }
    },
    async addAttributes(data: AddAttributesRule) {
      const res: any = await addAttributes(data)
      if (res.meta.status === 201) {
        ElMessage.success('创建成功')
      } else {
        ElMessage.error('创建失败')
      }
    },
    async deleteAttributes(data:{id:number,attrid:number}) {
      const res: any = await deleteAttributes(data.id,data.attrid)
      if (res.meta.status === 200) {
        ElMessage.success('删除成功')
      } else {
        ElMessage.error('删除失败')
      }
    },
    async putAttributes(data:PutAttributesRule) {
      console.log(data);
      const res: any = await putAttributes(data)
      if (res.meta.status === 200) {
        ElMessage.success('更新成功')
      } else {
        ElMessage.error('更新失败')
      }
    }
  }
})
