<template>
  <div class="categories" v-loading="loading">
    <el-card shadow="never">
      <!-- 头部 -->
      <div class="top">
        <div class="title">商品分类</div>
        <div class="add">
          <el-button type="primary" @click="open">添加分类</el-button>
        </div>
      </div>
      <!-- 树形结构 -->
      <el-tree :data="categories" :props="defaultProps" node-key="cat_id">
        <template #default="{ node, data }">
          <div class="box">
            <div class="left-area">
              <el-tag class="ml-2" v-if="data.cat_level === 0">一级分类</el-tag>
              <el-tag class="ml-2" type="success" v-if="data.cat_level === 1">二级分类</el-tag>
              <el-tag class="ml-2" type="warning" v-if="data.cat_level === 2">三级分类</el-tag>
              <span>{{ data.cat_name }}</span>
            </div>
            <div class="right-area">
              <el-link
                type="primary"
                :icon="EditPen"
                :underline="false"
                @click.stop="editCategories(data.cat_id, data.cat_name)"
                >编辑</el-link
              >
              <div @click.stop="">
                <el-popconfirm
                  title="是否要删除该分类?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="deleteCategories(data.cat_id)"
                >
                  <template #reference>
                    <el-link type="danger" :icon="Delete" :underline="false">删除</el-link>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </template>
      </el-tree>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog v-model="addCategoriesDialogVisible" title="添加分类" width="30%">
      <el-form
        :model="addCategoriesform"
        label-width="80px"
        :rules="addCategoriesRules"
        ref="addCategoriesFormRef"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCategoriesform.cat_name" />
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            :options="categoriesType"
            :props="cascaderProps"
            @change="handleCategoriesChange"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCategoriesDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addCategories">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default { name: 'Categories' }
</script>
<script setup lang="ts">
import { onMounted } from 'vue'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { cateroriesStore } from '@/store/categories'
import { storeToRefs } from 'pinia'
import { useAddCategories } from './hooks/useAddCategories'
const {
  addCategoriesDialogVisible,
  cascaderProps,
  addCategoriesform,
  addCategoriesRules,
  addCategories,
  handleCategoriesChange,
  open
} = useAddCategories() //添加分类
const store = cateroriesStore()
const { categories, categoriesType, loading } = storeToRefs(store)
const defaultProps = {
  children: 'children',
  label: 'cat_name'
}
//删除分类
const deleteCategories = (id: number) => {
  store.deleteCategories(id).then(() => {
    store.getCategories()
  })
}
//编辑分类
const editCategories = (id: number, name: string) => {
  ElMessageBox.prompt('编辑分类', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '不能为空',
    inputValue: name
  }).then(({ value }) => {
    store.putCategories({ id, name: value }).then(() => {
      store.getCategories()
    })
  })
}
onMounted(() => {
  store.getCategories()
  store.getCategoriesType()
})
</script>
<style scoped lang="less">
.box {
  display: flex;
  justify-content: space-between;
  padding-left: 8px;
  width: 100%;
  .left-area {
    .el-tag {
      margin-right: 15px;
    }
  }
  .right-area {
    display: flex;
    margin-right: 30px;
    .el-link {
      margin-right: 20px;
    }
  }
}
.top {
  display: flex;
  justify-content: space-between;
  .title {
    margin-left: 10px;
    font-size: 18px;
    font-weight: 600;
  }
  .add {
    margin-right: 50px;
    margin-bottom: 5px;
  }
}
.el-cascader {
  width: 362px !important;
}
</style>
