<template>
  <div class="roles">
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
              <el-link
                type="warning"
                :icon="Setting"
                :underline="false"
                @click="getRights(scope.row, scope.row.id)"
                >分配权限</el-link
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog
      v-model="addRoledialogVisible"
      title="编辑用户"
      width="30%"
      @close="addRoledialogClose"
    >
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
      <el-form
        :model="editRoleform"
        label-width="80px"
        :rules="editRoleRules"
        ref="editRoleFormRef"
      >
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
    <!-- 分配权限对话框 -->
    <el-dialog
      v-model="assignRightsdialogVisible"
      title="分配权限"
      width="30%"
      @close="assignRightsDialogClose"
      destroy-on-close
    >
      <el-tree
        :data="rightsTree"
        :props="rightsTreeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultkeys"
        ref="treeRef"
      ></el-tree>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assignRightsdialogVisible = false">取消</el-button>
          <el-button type="primary" @click="assignRight">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
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
import { useEditRole } from './hooks/useEditRole'
import { useAddRole } from './hooks/useAddRole'
import { useAssignRight } from './hooks/useAssignRight'
const store = roleStore()
const { roles, rightsTree } = storeToRefs(store)
const { editRoledialogVisible, editRoleFormRef, editRoleform, editRoleRules, getRole, editRole } =
  useEditRole() //编辑用户
const {
  addRoledialogVisible,
  addRoleFormRef,
  addRoleform,
  addRoleRules,
  addRole,
  addRoledialogClose
} = useAddRole() //添加角色
const {
  assignRightsdialogVisible,
  treeRef,
  defaultkeys,
  rightsTreeProps,
  getRights,
  assignRight,
  assignRightsDialogClose
} = useAssignRight() //分配权限

//删除用户
const deleteRoles = (id: number, username: string) => {
  ElMessageBox.confirm(`确认删除用户${username}吗`, '删除用户', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    store.deleteRoles(id)
  })
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
