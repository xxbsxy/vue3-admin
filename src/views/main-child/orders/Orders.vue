<template>
  <div class="orders">
    <el-card>
      <!-- 订单列表 -->
      <el-table :data="orders" stripe style="width: 100%" border>
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="order_number" label="订单编号" width="330px" />
        <el-table-column prop="order_price" label="订单价格" />
        <el-table-column label="付款方式">
          <template #default="scope">
            <el-tag class="ml-2" type="danger" v-if="scope.row.order_pay === '0'">未付款</el-tag>
            <el-tag class="ml-2" v-if="scope.row.order_pay === '1'">支付宝</el-tag>
            <el-tag class="ml-2" type="success" v-if="scope.row.order_pay === '2'">微信支付</el-tag>
            <el-tag class="ml-2" type="info" v-if="scope.row.order_pay === '3'">银行卡</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" />
        <el-table-column prop="email" label="订单更新时间">
          <template #default="scope">
            {{ formatTimeStamp(scope.row.update_time * 1000) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <div class="control">
              <el-link
                type="primary"
                :icon="EditPen"
                :underline="false"
                @click="getOrder(scope.row)"
                >编辑</el-link
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-model:currentPage="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 30]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination"
      />
      <!-- 编辑订单对话框 -->
      <el-dialog v-model="editOrderdialogVisible" title="编辑订单" width="30%">
        <el-form :model="editOrderform" label-width="100px" ref="editOrderFormRef">
          <el-form-item label="订单价格: ">
            <el-col :span="13">
              <el-input v-model="editOrderform.order_price" />
            </el-col>
          </el-form-item>
          <el-form-item label="支付方式: ">
            <el-select class="m-2" placeholder="Select" v-model="editOrderform.order_pay">
              <el-option
                v-for="item in pay"
                :key="item.state"
                :label="item.title"
                :value="item.state"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否发货: ">
            <el-select class="m-2" placeholder="Select" v-model="editOrderform.is_send">
              <el-option
                v-for="item in send"
                :key="item.state"
                :label="item.title"
                :value="item.state"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editOrderdialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editOrder">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
export default { name: 'Orders' }
</script>
<script setup lang="ts">
import { ordersStore } from '@/store/orders'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { EditPen } from '@element-plus/icons-vue'
import { formatTimeStamp } from '@/utils/formatTimeStamp'
import { useEditOrders } from './hooks/useEditOrders'
const store = ordersStore()
const { orders, total } = storeToRefs(store)
const pageSize = ref(10) //每页显示条数
const pageNum = ref(1) //当前页码
const { editOrderdialogVisible, editOrderform, pay, send, getOrder, editOrder } = useEditOrders(
  pageSize.value,
  pageNum.value
)
//每页显示条数改变触发
const handleSizeChange = (newPageSize: number) => {
  store.getOrders({ pagenum: pageNum.value, pagesize: newPageSize })
  pageSize.value = newPageSize
}
//页码改变触发
const handleCurrentChange = (newPageNum: number) => {
  store.getOrders({ pagenum: newPageNum, pagesize: pageSize.value })
  pageNum.value = newPageNum
}
onMounted(() => {
  store.getOrders({ pagenum: 1, pagesize: 10 })
})
</script>
<style scoped lang="less">
.delete {
  margin-left: 12px;
}
.pagination {
  margin-top: 20px;
}
</style>
