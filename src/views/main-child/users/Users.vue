<template>
  <!-- 查询 -->
  <el-card class="box-card">
    <el-form :model="userForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="请输入需要查询的id" width="200px" v-model.number="userForm.id" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="searchUser">查询</el-button>
          <el-button :icon="Refresh" @click="resetForm">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 用户列表 -->
    <div class="user-list">
      用户列表
      <el-button type="primary" @click="addUserdialogVisible = true" class="add-btn">
        添加用户
      </el-button>
    </div>
    <el-table :data="users" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="username" label="姓名" width="150" />
      <el-table-column prop="mobile" label="手机号码" width="180" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="email" label="创建时间" width="200">
        <template #default="scope">
          {{ formatTimeStamp(scope.row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="150" />
      <el-table-column prop="role_name" label="状态" width="150">
        <template #default="scope">
          <el-switch
            v-model="scope.row.mg_state"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            @change="changeStatus(scope.row.id, scope.row.mg_state)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="control">
            <el-link
              type="primary"
              :icon="EditPen"
              :underline="false"
              @click="
                editGetUser(scope.row.username, scope.row.email, scope.row.mobile, scope.row.id)
              "
              >编辑</el-link
            >
            <el-link
              type="danger"
              :icon="Delete"
              :underline="false"
              @click="deleteUser(scope.row.id, scope.row.username)"
            >
              删除
            </el-link>

            <el-link type="warning" :icon="Setting" :underline="false">分配权限</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[10, 15, 20]"
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    />
  </el-card>
  <!-- 添加用户对话框 -->
  <el-dialog v-model="addUserdialogVisible" title="添加用户" width="30%">
    <el-form :model="addUserform" label-width="80px" :rules="addUserRules" ref="addUserFormRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addUserform.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addUserform.password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addUserform.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addUserform.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addUserdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 编辑用户对话框 -->
  <el-dialog v-model="editUserdialogVisible" title="编辑用户" width="30%">
    <el-form :model="editUserform" label-width="80px" :rules="editUserRules" ref="editUserFormRef">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addUserform.username" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUserform.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editUserform.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editUserdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUser">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default { name: 'Users' }
</script>
<script setup lang="ts">
import { Search, Refresh, EditPen, Delete, Setting } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import { userStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { formatTimeStamp } from '../../../utils/formatTimeStamp.js'
import { ElMessageBox } from 'element-plus'
const store = userStore()
const { users, total } = storeToRefs(store)
const userForm = reactive({
  id: ''
})
const pageSize = ref(10) //每页显示条数
const pageNum = ref(1) //当前页码
const addUserdialogVisible = ref(false)
const editUserdialogVisible = ref(false)
const addUserFormRef = ref(null)
const editUserFormRef = ref(null)
const addUserform = reactive({
  username: '123456',
  password: '123456',
  email: '123222@qq.com',
  mobile: '18001439901'
})
const addUserRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名必须在3到10位之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '密码必须在5到10位之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min: 10, max: 30, message: '请输入正确的邮箱', trigger: 'blur' },
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      message: '请输入正确的邮箱'
    }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码'
    }
  ]
})
const editUserform = reactive({
  id: -1,
  username: '',
  email: '',
  mobile: ''
})
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
//每页显示条数改变触发
const handleSizeChange = (newPageSize) => {
  store.getUsers({ pagenum: pageNum.value, pagesize: newPageSize })
  pageSize.value = newPageSize
}
//页码改变触发
const handleCurrentChange = (newPageNum) => {
  store.getUsers({ pagenum: newPageNum, pagesize: pageSize.value })
  pageNum.value = newPageNum
}
//根据id查询
const searchUser = () => {
  if (userForm.id === '') {
    store.getUsers({ pagenum: 1, pagesize: 10 })
  } else {
    store.getUsersFromId(userForm.id)
  }
}
//点击确认添加用户
const addUser = () => {
  addUserFormRef.value.validate((isValidate) => {
    if (isValidate) {
      store.addUser(addUserform)
      store.getUsers({ pagenum: pageNum.value, pagesize: pageSize.value })
    }
  })
  addUserdialogVisible.value = false
}
//删除用户
const deleteUser = (id, username) => {
  ElMessageBox.confirm(`确认删除用户${username}吗`, '删除用户', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    store.deleteUsersFromId(id)
    store.getUsers({ pagenum: pageNum.value, pagesize: pageSize.value })
  })
}
//点击编辑按钮获得用户信息
const editGetUser = (username, email, mobile, id) => {
  editUserdialogVisible.value = true
  editUserform.username = username
  editUserform.email = email
  editUserform.mobile = mobile
  editUserform.id = id
}
//点击确认编修改用户信息
const editUser = () => {
  editUserFormRef.value.validate((isValidate) => {
    if (isValidate) {
      const newArr = store.editUsersFromId(editUserform)
      store.getUsers({ pagenum: pageNum.value, pagesize: pageSize.value })
    }
  })
  editUserdialogVisible.value = false
}
//修改用户状态
const changeStatus = (uid, type) => {
  store.changeUserStatus({ uid, type })
}
//重置
const resetForm = () => {
  userForm.id = ''
  store.getUsers({ pagenum: 1, pagesize: 10 })
}
onMounted(() => {
  store.getUsers({ pagenum: 1, pagesize: 10 })
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 15px;
}
.pagination {
  margin-top: 20px;
}

.user-list {
  position: relative;
  height: 40px;
  .add-btn {
    position: absolute;
    right: 10px;
    bottom: 15px;
  }
}
</style>
