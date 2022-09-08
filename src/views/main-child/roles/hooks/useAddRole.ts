import { reactive, ref } from 'vue'
import { roleStore } from '@/store/roles'
export function useAddRole() {
  let addRoledialogVisible = ref(false)
  const store = roleStore()
  const addRoleFormRef = ref()
  const addRoleform = reactive({
    roleName: '',
    roleDesc: ''
  })
  const addRoleRules = reactive({
    roleName: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { min: 3, max: 10, message: '角色名称必须在3到10位之间', trigger: 'blur' }
    ],
    roleDesc: [
      { required: true, message: '请输入角色描述', trigger: 'blur' },
      { min: 4, max: 15, message: '角色描述必须在4到15位之间', trigger: 'blur' }
    ]
  })
  const addRole = () => {
    addRoleFormRef.value.validate((isValidate: boolean) => {
      if (isValidate) {
        store.addRoles(addRoleform)
      }
    })
    addRoledialogVisible.value = false
  }
  return {
    addRoledialogVisible,
    addRoleFormRef,
    addRoleform,
    addRoleRules,
    addRole
  }
}
