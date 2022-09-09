<template>
  <div class="params">
    <el-card shadow="never">
      <el-alert title="注意只能为三级分类设置" type="warning" show-icon :closable="false" />

      <el-row>
        <el-col :span="12">
          选择商品分类:
          <el-cascader :options="categories" :props="cascaderProps" />
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="动态参数" name="first">User</el-tab-pane>
        <el-tab-pane label="静态参数" name="second">Config</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
export default { name: 'Params' }
</script>
<script setup lang="ts">
import { paramsStore } from '@/store/params'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
let activeName = ref('first')
const cascaderProps = {
  value: 'cat_id',
  label: 'cat_name',
  children: 'children',
  expandTrigger: 'hover'
}
const store = paramsStore()
const { categories } = storeToRefs(store)
onMounted(() => {
  store.getCategories()
})
</script>
<style scoped lang="less">
.el-alert {
  margin-bottom: 20px;
}
.el-input {
  width: 300px !important;
}
</style>
