<template>
  <el-card>
    <el-table :data="rights" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="authName" label="权限名称" />
      <el-table-column label="权限等级">
        <template #default="scope">
          <el-tag class="ml-2" v-if="scope.row.level === '0'">一级权限</el-tag>
          <el-tag class="ml-2" type="success" v-if="scope.row.level === '1'">二级权限</el-tag>
          <el-tag class="ml-2" type="warning" v-if="scope.row.level === '2'">三级权限</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="访问路径" />
    </el-table>
  </el-card>
</template>

<script lang="ts">
export default { name: 'Rigths' }
</script>
<script setup lang="ts">
import { rightStore } from '@/store/rights'
import { storeToRefs } from 'pinia'
import { onMounted } from '@vue/runtime-core'
const store = rightStore()
const { rights } = storeToRefs(store)
onMounted(() => {
  store.getRightsList()
})
</script>
<style scoped lang="less">
.right-list {
  margin-bottom: 10px;
  margin-left: 5px;
}
</style>
