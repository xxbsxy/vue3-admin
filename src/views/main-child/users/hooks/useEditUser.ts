import { userStore } from '@/store/user'
import { reactive, ref } from 'vue'
export function useEditUser(pageSize: number, pageNum: number) {
  const store = userStore()
  const editUserdialogVisible = ref(false)//控制编辑用户对话框的显示
  const editUserFormRef = ref()//编辑用户表单的ref
  //编辑用户表单
  const editUserform = reactive({
    id: -1,
    username: '',
    email: '',
    mobile: ''
  })
  //编辑用户表单规则
  const editUserRules = reactive({
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { min: 10, max: 30, message: '请输入正确的邮箱', trigger: 'blur' },
      {
        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
        message: '请输入正确的邮箱',
        trigger: 'blur'
      }
    ],
    mobile: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
      {
        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur'
      }
    ]
  })
  //点击编辑按钮获得用户信息
  const editGetUser = (username: string, email: string, mobile: string, id: number) => {
    editUserdialogVisible.value = true
    editUserform.username = username
    editUserform.email = email
    editUserform.mobile = mobile
    editUserform.id = id
  }
  //点击确认编修改用户信息
  const editUser = () => {
    editUserFormRef.value.validate((isValidate: boolean) => {
      if (isValidate) {
        store.editUsersFromId(editUserform).then(() => {
          store.getUsers({ pagenum: pageNum, pagesize: pageSize })
        })
      }
    })
    editUserdialogVisible.value = false
  }
  return {
    editUserdialogVisible,
    editUserFormRef,
    editUserform,
    editUserRules,
    editGetUser,
    editUser
  }
}
