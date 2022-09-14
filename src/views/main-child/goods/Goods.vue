<template>
  <div class="goods" v-loading="loading">
    <el-card>
      <!-- 查询 -->
      <el-row :gutter="20" class="search-area">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="请输入商品名称" width="200px" v-model.number="query" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="searchGoods">查询</el-button>
          <el-button :icon="Refresh" @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表 -->
      <div class="goods-list">
        商品列表
        <el-button type="primary" class="add-btn" @click="open"> 添加商品 </el-button>
      </div>
      <el-table :data="goods" stripe style="width: 100%" border>
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="goods_name" label="商品名称" width="700px" />
        <el-table-column prop="goods_price" label="商品价格" />
        <el-table-column prop="goods_number" label="商品数量" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div class="control">
              <el-link
                type="danger"
                :icon="Delete"
                :underline="false"
                @click="deleteGoods(scope.row.goods_id)"
              >
                删除
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <form-drawer ref="deawerRef" title="添加商品" @submit="submitGoods" @closed="deawerClosed">
        <el-steps :active="acticeIndex - 0" align-center>
          <el-step title="基本信息" />
          <!-- <el-step title="商品参数" />
          <el-step title="商品属性" /> -->
          <el-step title="商品图片" />
          <el-step title="商品内容" />
          <el-step title="完成" />
        </el-steps>
        <el-form
          :inline="true"
          :model="addGoodsForm"
          :rules="addGoodsRules"
          label-position="top"
          ref="addGoodsRef"
        >
          <el-tabs tab-position="left" v-model="acticeIndex" :before-leave="beforeLeave">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addGoodsForm.goods_name" />
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="addGoodsForm.goods_price" />
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="addGoodsForm.goods_weight" />
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="addGoodsForm.goods_number" />
              </el-form-item>
              <el-form-item label="商品分类" prop="goods_number">
                <el-cascader
                  :options="categories"
                  :props="cascaderProps"
                  @change="handleCascaderchange"
                />
              </el-form-item>
            </el-tab-pane>
            <!-- <el-tab-pane label="商品参数" name="1">Config</el-tab-pane>
            <el-tab-pane label="商品属性" name="2">Role</el-tab-pane> -->
            <el-tab-pane label="商品图片" name="3">
              <el-upload
                class="upload-demo"
                action="http://43.143.0.76:8889/api/private/v1/upload"
                drag
                multiple
                :headers="{
                  Authorization: token
                }"
                list-type="picture"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">拖拽或者<em>点击上传</em></div>
                <template #tip>
                  <div class="el-upload__tip">图片大小不能大于500kb</div>
                </template>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <QuillEditor theme="snow" ref="editorRef" />
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </form-drawer>
      <!-- 分页 -->
      <el-pagination
        v-model:currentPage="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[15, 30, 50, 100]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import FormDrawer from '@/components/form-drawer/form-drawer.vue'
import { goodsStore } from '@/store/goods'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { Search, Refresh, Delete, UploadFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import localCache from '@/utils/cache'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { usePutGoods } from './hooks/usePutGoods'
const token = localCache.getCache('token') //获取token
const store = goodsStore()
const { goods, total, loading, categories } = storeToRefs(store)
let pageSize = ref(15) //每页显示条数
let pageNum = ref(1) //当前页码
let query = ref('') //查询参数
const {
  addGoodsRef,
  editorRef,
  deawerRef,
  addGoodsForm,
  addGoodsRules,
  cascaderProps,
  acticeIndex,
  beforeLeave,
  deawerClosed,
  submitGoods,
  handleCascaderchange
} = usePutGoods() //添加商品
//每页显示条数改变触发
const handleSizeChange = (newPageSize: number) => {
  store.getGoodsList({ pagenum: pageNum.value, pagesize: newPageSize })
  pageSize.value = newPageSize
}
//页码改变触发
const handleCurrentChange = (newPageNum: number) => {
  store.getGoodsList({ pagenum: newPageNum, pagesize: pageSize.value })
  pageNum.value = newPageNum
}
//查询商品
const searchGoods = () => {
  if (query.value === '') {
    store.getGoodsList({ pagenum: 1, pagesize: 15 })
    pageSize.value = 15
    pageNum.value = 1
  }
  store.getGoodsList({ pagenum: 1, pagesize: 15, query: query.value })
}
//重置
const reset = () => {
  query.value = ''
  store.getGoodsList({ pagenum: 1, pagesize: 15 })
  pageSize.value = 15
  pageNum.value = 1
}
//点击添加商品打开抽屉组件
const open = () => {
  store.getCategories()
  deawerRef.value.open()
}
//删除商品
const deleteGoods = (id: number) => {
  ElMessageBox.confirm(`确认删除该商品吗`, '删除商品', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    store.deleteGoods(id)
    setTimeout(() => {
      store.getGoodsList({ pagenum: pageNum.value, pagesize: pageSize.value })
    }, 100)
  })
}
onMounted(() => {
  store.getGoodsList({ pagenum: 1, pagesize: 15 })
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 15px;
}
.pagination {
  margin-top: 20px;
}
.search-area {
  margin-bottom: 20px;
}
.goods-list {
  position: relative;
  height: 40px;
  .add-btn {
    position: absolute;
    right: 10px;
    bottom: 15px;
  }
}
.el-tabs {
  width: 100%;
  margin-top: 20px;
}
.el-input {
  width: 100%;
}
</style>
