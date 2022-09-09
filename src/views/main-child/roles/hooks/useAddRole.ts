import { reactive, ref } from 'vue'
import { roleStore } from '@/store/roles'
export function useAddRole() {

  const store = roleStore()
  let addRoledialogVisible = ref(false)//控制添加角色对话框的显示
  const addRoleFormRef = ref()  //添加角色表单的ref
  //添加角色表单
  const addRoleform = reactive({
    roleName: '',
    roleDesc: ''
  })
  //添加角色规则
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
  //添加角色
  const addRole = () => {
    addRoleFormRef.value.validate((isValidate: boolean) => {
      if (isValidate) {
        store.addRoles(addRoleform).then(() => {
          addRoleFormRef.value.resetFields()
          addRoledialogVisible.value = false
        })
      }
    })

  }
   //添加角色对话框关闭的回调
  const addRoledialogClose = () => {
    addRoleFormRef.value.resetFields()
  }
  return {
    addRoledialogVisible,
    addRoleFormRef,
    addRoleform,
    addRoleRules,
    addRoledialogClose,
    addRole
  }
}
