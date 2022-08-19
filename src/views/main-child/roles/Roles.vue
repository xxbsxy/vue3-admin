<template>
  <el-card>
    <div class="roles-list">
      角色列表
      <el-button type="primary" class="add-btn" @click="addRoledialogVisible = true">
        添加角色
      </el-button>
    </div>
    <el-table :data="roles" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleDesc" label="角色描述" />
      <el-table-column label="操作">
        <template #default="scope">
          <div class="control">
            <el-link
              type="primary"
              :icon="EditPen"
              :underline="false"
              @click="getRole(scope.row.roleName, scope.row.roleDesc, scope.row.id)"
              >编辑</el-link
            >
            <el-link
              type="danger"
              :icon="Delete"
              :underline="false"
              @click="deleteRoles(scope.row.id, scope.row.roleName)"
            >
              删除
            </el-link>
            <el-link type="warning" :icon="Setting" :underline="false">分配权限</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 添加角色对话框 -->
  <el-dialog v-model="addRoledialogVisible" title="编辑用户" width="30%">
    <el-form :model="addRoleform" label-width="80px" :rules="addRoleRules" ref="addRoleFormRef">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addRoleform.roleName" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addRoleform.roleDesc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addRoledialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRole">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 编辑角色对话框 -->
  <el-dialog v-model="editRoledialogVisible" title="编辑用户" width="30%">
    <el-form :model="editRoleform" label-width="80px" :rules="editRoleRules" ref="editRoleFormRef">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editRoleform.roleName" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editRoleform.roleDesc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editRoledialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editRole">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default { name: 'Roles' }
</script>
<script setup lang="ts">
import { EditPen, Delete, Setting } from '@element-plus/icons-vue'
import { roleStore } from '@/store/roles'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
const store = roleStore()
const { roles } = storeToRefs(store)
let editRoledialogVisible = ref(false)
let addRoledialogVisible = ref(false)
const editRoleFormRef = ref()
const editRoleform = reactive({
  id: -1,
  roleName: '',
  roleDesc: ''
})
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
//点击编辑获取用户信息
const getRole = (roleName: string, roleDesc: string, id: number) => {
  editRoleform.roleName = roleName
  editRoleform.roleDesc = roleDesc
  editRoleform.id = id
  editRoledialogVisible.value = true
}
//删除jues
const deleteRoles = (id: number, username: string) => {
  ElMessageBox.confirm(`确认删除用户${username}吗`, '删除用户', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    store.deleteRoles(id)
  })
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
//点击添加角色
const addRole = () => {
  addRoleFormRef.value.validate((isValidate: boolean) => {
    if (isValidate) {
      store.addRoles(addRoleform)
    }
  })
  addRoledialogVisible.value = false
}
onMounted(() => {
  store.getRoles()
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 15px;
}
.pagination {
  margin-top: 20px;
}

.roles-list {
  position: relative;
  height: 40px;
  .add-btn {
    position: absolute;
    right: 10px;
    bottom: 15px;
  }
}
</style>
