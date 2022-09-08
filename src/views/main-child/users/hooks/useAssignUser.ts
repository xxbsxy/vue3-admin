import { userStore } from '@/store/user'
import { reactive, ref } from 'vue'
export function useAssignUser(pageSize: number, pageNum: number) {
  const store = userStore()
  const assignRoledialogVisible = ref(false)
  const assignRoleform = reactive({
    id: -1,
    username: '',
    role_name: '',
    roleId: ''
  })
  //点击分配角色按钮获得用户信息
  const getUserRole = (id: number, username: string, role_name: string) => {
    assignRoleform.id = id
    assignRoleform.username = username
    assignRoleform.role_name = role_name
    assignRoledialogVisible.value = true
  }
  //点击确认分配角色
  const assignRole = () => {
    store
      .assignUserRole({
        id: assignRoleform.id,
        rid: Number(assignRoleform.roleId)
      })
      .then(() => {
        store.getUsers({ pagenum: pageNum, pagesize: pageSize })
      })
    assignRoledialogVisible.value = false
  }
  return {
    assignRoledialogVisible,
    assignRoleform,
    getUserRole,
    assignRole

  }
}
