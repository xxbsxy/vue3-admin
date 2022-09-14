<template>
  <div class="params">
    <el-card shadow="never">
      <el-alert title="注意只能为三级分类设置" type="warning" show-icon :closable="false" />
      选择商品分类:
      <el-cascader :options="categories" :props="cascaderProps" @change="handleCascaderchange" />
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
        <!-- 动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" @click="addManyAttributes" :disabled="isDisable"
            >添加参数</el-button
          >
          <el-table :data="attributesMany" stripe style="width: 100%">
            <el-table-column type="expand">
              <template #default="props"> </template>
            </el-table-column>
            <el-table-column type="index" width="60" label="序号" />
            <el-table-column prop="attr_name" label="参数名称" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <div class="control">
                  <el-link
                    type="primary"
                    :icon="EditPen"
                    :underline="false"
                    @click="editAttributes(scope.row.attr_id, scope.row.attr_name)"
                    >编辑</el-link
                  >
                  <el-popconfirm
                    title="是否要删除该分类?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="deleteAttributes(scope.row.attr_id)"
                  >
                    <template #reference>
                      <el-link type="danger" :icon="Delete" :underline="false">删除</el-link>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" @click="addOnlyAttributes" :disabled="isDisable"
            >添加属性</el-button
          >
          <el-table :data="attributesOnly" stripe style="width: 100%">
            <el-table-column type="expand">
              <template #default="props"> </template>
            </el-table-column>
            <el-table-column type="index" width="60" label="序号" />
            <el-table-column prop="attr_name" label="属性名称" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <div class="control">
                  <el-link
                    type="primary"
                    :icon="EditPen"
                    :underline="false"
                    @click="editAttributes(scope.row.attr_id, scope.row.attr_name)"
                    >编辑</el-link
                  >
                  <el-popconfirm
                    title="是否要删除该分类?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="deleteAttributes(scope.row.attr_id)"
                  >
                    <template #reference>
                      <el-link type="danger" :icon="Delete" :underline="false">删除</el-link>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { EditPen, Delete } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { paramsStore } from '@/store/params'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
const store = paramsStore()
const { categories, attributesMany, attributesOnly } = storeToRefs(store)
let isDisable = ref(true) //按钮是否禁用
let activeName = ref('many') //活跃的tab名称
let selectKeys = reactive([] as Array<number>) //联级选择框绑定的数组
//联级选择框的规则
const cascaderProps = {
  value: 'cat_id',
  label: 'cat_name',
  children: 'children',
  expandTrigger: 'hover'
}
//联级选择器改变
const handleCascaderchange = (value: Array<number>) => {
  store.getAttributes({ id: value[2], sel: [activeName.value] })
  selectKeys = value
  isDisable.value = false
}
//tab切换
const tabChange = (newName: string) => {
  if (selectKeys.length === 3) {
    store.getAttributes({ id: selectKeys[2], sel: [newName] })
  }
}
//添加静态属性
const addOnlyAttributes = () => {
  ElMessageBox.prompt('添加静态属性', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '不能为空',
    inputValue: ''
  }).then((value: any) => {
    store
      .addAttributes({ attr_name: value.value, id: selectKeys[2], attr_sel: [activeName.value] })
      .then(() => {
        store.getAttributes({ id: selectKeys[2], sel: [activeName.value] })
      })
  })
}
//添加动态属性
const addManyAttributes = () => {
  ElMessageBox.prompt('添加动态属性', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '不能为空',
    inputValue: ''
  }).then((value: any) => {
    store
      .addAttributes({ attr_name: value.value, id: selectKeys[2], attr_sel: [activeName.value] })
      .then(() => {
        store.getAttributes({ id: selectKeys[2], sel: [activeName.value] })
      })
  })
}
//删除属性
const deleteAttributes = (attrid: number) => {
  store.deleteAttributes({ id: selectKeys[2], attrid: attrid }).then(() => {
    store.getAttributes({ id: selectKeys[2], sel: [activeName.value] })
  })
}
//编辑属性
const editAttributes = (attrid: number, name: string) => {
  ElMessageBox.prompt('编辑属性', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '不能为空',
    inputValue: name
  }).then((value: any) => {
    store
      .putAttributes({
        attr_name: value.value,
        attrid,
        id: selectKeys[2],
        attr_sel: [activeName.value]
      })
      .then(() => {
        store.getAttributes({ id: selectKeys[2], sel: [activeName.value] })
      })
  })
}
onMounted(() => {
  store.getCategories()
})
</script>
<style scoped lang="less">
.el-alert {
  margin-bottom: 20px;
}
.el-tabs {
  margin-top: 12px;
}
.el-link {
  margin-right: 30px;
}
</style>
