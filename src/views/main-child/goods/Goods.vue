<template>
  <el-card>
    <!-- 查询 -->
    <el-row :gutter="20" class="search-area">
      <el-col :span="6">
        <el-form-item>
          <el-input placeholder="请输入商品id" width="200px" v-model.number="goosId" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" :icon="Search">查询</el-button>
        <el-button :icon="Refresh">重置</el-button>
      </el-col>
    </el-row>
    <div class="goods-list">
      商品列表
      <el-button type="primary" class="add-btn"> 添加商品 </el-button>
    </div>
    <el-table :data="goods" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="goods_name" label="商品名称" width="600px" />
      <el-table-column prop="goods_price" label="商品价格" />
      <el-table-column prop="goods_number" label="商品数量" />
      <el-table-column prop="email" label="更新时间" width="200">
        <template #default="scope">
          {{ formatTimeStamp(scope.row.upd_time * 1000) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="control">
            <el-link type="primary" :icon="EditPen" :underline="false">编辑</el-link>
            <el-link type="danger" :icon="Delete" :underline="false"> 删除 </el-link>
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
</template>

<script lang="ts">
export default { name: 'Goods' }
</script>
<script setup lang="ts">
import { goodsStore } from '@/store/goods'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from '@vue/runtime-core'
import { formatTimeStamp } from '../../../utils/formatTimeStamp'
import { Search, Refresh, EditPen, Delete } from '@element-plus/icons-vue'
const store = goodsStore()
const { goods, total } = storeToRefs(store)
const pageSize = ref(10) //每页显示条数
const pageNum = ref(1) //当前页码
const goosId = ref('')
//每页显示条数改变触发
const handleSizeChange = (newPageSize: number) => {}
//页码改变触发
const handleCurrentChange = (newPageNum: number) => {}
onMounted(() => {
  store.getGoodsList({ pagenum: 1, pagesize: 10 })
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
</style>
