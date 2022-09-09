import {  reactive, ref } from 'vue'
import { roleStore } from '@/store/roles'
export function useEditRole() {
  const store = roleStore()
  let editRoledialogVisible = ref(false) //控制编辑角色对话框的显示
  const editRoleFormRef = ref() //编辑角色表单的ref
  //编辑角色表单
  const editRoleform = reactive({
    id: -1,
    roleName: '',
    roleDesc: ''
  })
  //编辑角色规则
  const editRoleRules = reactive({
    roleName: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { min: 3, max: 10, message: '角色名称必须在3到10位之间', trigger: 'blur' }
    ],
    roleDesc: [
      { required: true, message: '请输入角色描述', trigger: 'blur' },
      { min: 4, max: 15, message: '角色描述必须在4到15位之间', trigger: 'blur' }
    ]
  })
  //点击编辑获取用户信息
  const getRole = (roleName: string, roleDesc: string, id: number) => {
    editRoleform.roleName = roleName
    editRoleform.roleDesc = roleDesc
    editRoleform.id = id
    editRoledialogVisible.value = true
  }
  //点击确认修改角色信息
  const editRole = () => {
    editRoleFormRef.value.validate((isValidate: boolean) => {
      if (isValidate) {
        store.editRoles(editRoleform)
      }
    })
    editRoledialogVisible.value = false
  }
  return {
    editRoledialogVisible,
    editRoleFormRef,
    editRoleform,
    editRoleRules,
    getRole,
    editRole

  }
}
