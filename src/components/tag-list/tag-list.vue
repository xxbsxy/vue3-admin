<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-remove="removeTab"
    @tab-change="handleTabChange"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      class="tab"
      :closable="item.title !== '后台首页'"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default { name: 'tag-list' }
</script>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loginStore } from '@/store/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { tabList, activeName } = storeToRefs(store)
const route = useRoute()
const router = useRouter()
//移除tab
const removeTab = (name: string) => {
  tabList.value.forEach((item, index) => {
    if (item.name === name) {
      store.tabList.splice(index, 1)
      if (name === route.meta.title) {
        router.push(store.tabList[index - 1].path)
      }
    }
  })
}
//点击tab跳转
const handleTabChange = (name: string) => {
  tabList.value.forEach((item) => {
    if (item.name === name) {
      router.push(item.path)
    }
  })
}

// 监听路由变化增加标签
watch(
  () => route,
  (newvalue) => {
    let flag = true
    store.activeName = newvalue.meta.title as string
    document.title = 'Shop-Admin-' + newvalue.meta.title
    tabList.value.forEach((item) => {
      if (item.title === newvalue.meta.title) {
        flag = false
      }
    })
    if (flag) {
      store.tabList.push({
        title: newvalue.meta.title,
        path: newvalue.path,
        name: newvalue.meta.title
      })
    }
  },
  { deep: true, immediate: true }
)
</script>
<style scoped lang="less">
:deep(.el-tabs__header) {
  border: 0 !important;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  margin-right: 10px;
  border-radius: 6px;
}
</style>
