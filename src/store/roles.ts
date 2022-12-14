import { defineStore } from 'pinia'
import { getRoles,editRoles,deleteRoles ,addRoles,assignRoleRights} from '@/api/roles'
import { getRightsTree} from '@/api/rights'

import { ElMessage } from 'element-plus'

interface changeRole {
  id:number,
  roleName:string,
  roleDesc?:string
}
interface addRole {
  roleName:string,
  roleDesc?:string
}
interface assignRights{
  id:number,
  rights:string
}
export const roleStore = defineStore('role', {
  // persist: true,
  state: () => {
    return {
      roles:[],
      rightsTree:[] as any[]
    }
  },
  actions: {
    async getRoles() {
      const res: any = await getRoles()
      if(res.meta.status === 200){
        ElMessage.success('获取角色列表成功')
        this.roles = res.data
     }else {
       ElMessage.error('获取角色列表失败')
     }
     const res1:any = await getRightsTree()
     this.rightsTree = res1.data

    },
    async editRoles(data:changeRole){
      const res:any = await editRoles(data.id,data.roleName,data.roleDesc)
      if(res.meta.status === 200){
        ElMessage.success('修改角色成功')
        this.getRoles()
     }else {
       ElMessage.error('修改角色失败')
     }
    },
    async deleteRoles(id:number){
      const res:any = await deleteRoles(id)
      if(res.meta.status === 200){
        ElMessage.success('删除角色成功')
        this.getRoles()
     }else {
       ElMessage.error('删除角色失败')
     }
    },
    async addRoles(data:addRole){
      const res:any = await addRoles(data.roleName,data.roleDesc)
      if(res.meta.status === 201){
        ElMessage.success('添加角色成功')
        this.getRoles()
     }else {
       ElMessage.error('添加角色失败')
     }
    },
    async assignRoleRights(data:assignRights){
      const res:any = await assignRoleRights(data.id,data.rights)
      if(res.meta.status === 200){
        ElMessage.success('分配角色成功')
        this.getRoles()
     }else {
       ElMessage.error('分配角色失败')
     }

    }
  }
})
