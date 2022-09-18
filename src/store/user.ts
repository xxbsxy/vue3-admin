import { defineStore } from 'pinia'
import { getUsers ,getUsersFromId,addUser,deleteUsersFromId,editUsersFromId,changeUserStatus,assignUserRole} from '@/api/user'
import { getRoles} from '@/api/roles'
import { ElMessage } from 'element-plus'
interface userList {
  query?:string,
  pagenum:number,
  pagesize:number
}
interface addUserList {
  username?:string,
  password:string,
  email:string,
  mobile:string
}
interface editUserList {
  id:number
  email?:string,
  mobile?:string
}
interface userStatus {
  uid:number
  type:boolean
}
interface assignRole {
  id:number,
  rid:number
}
export const userStore = defineStore('user', {
  // persist: true,
  state: () => {
    return {
      users:[] as any[],
      total:-1,
      roles:[] as any[]
    }
  },
  actions: {
    async getUsers(value:userList) {
      const res: any = await getUsers(value)
      if(res.meta.status === 200){
				 ElMessage.success('获取用户列表成功')
         this.users = res.data.users
         this.total = res.data.total
         const res1: any = await getRoles()
         this.roles = res1.data
      }else {
				ElMessage.error('获取用户列表成功失败')
      }
    },
    async getUsersFromId(id:number) {
      const res: any = await getUsersFromId(id)
      if(res.meta.status === 200){
				 ElMessage.success('查询成功')
         this.users= []
         this.total = 1
         this.users.unshift(res.data)
      }else {
				ElMessage.error('查询失败,请输入正确id')
        this.users= []
        this.total = 0
      }
    },
    async addUser(data:addUserList){
      const res:any = await addUser(data)
      if(res.meta.status === 201){
        ElMessage.success('创建用户成功')
     }else {
        ElMessage.error('创建用户失败')
     }
    },
    async deleteUsersFromId(id:number){
      const res:any = await deleteUsersFromId(id)
      if(res.meta.status === 200){
        ElMessage.success('删除用户成功')
     }else {
        ElMessage.error('删除用户失败')
     }
    },
    async editUsersFromId(data:editUserList){
      const res:any = await editUsersFromId(data.id,data.email,data.mobile)
      if(res.meta.status === 200){
        ElMessage.success('更新用户成功')
     }else {
        ElMessage.error('更新用户失败')
     }
    },
    async changeUserStatus(data:userStatus){
      const res:any = await changeUserStatus(data.uid,data.type)
      if(res.meta.status === 200) {
        ElMessage.success('更新状态成功')
     }else {
        ElMessage.error('更新状态失败')
     }
    },
    async assignUserRole(data:assignRole) {
      const res:any = await assignUserRole(data.id,data.rid)
      if(res.meta.status === 200) {
        ElMessage.success('更新角色成功')
      }else {
        ElMessage.error('更新角色失败')
       }
    }
  }
})
