<template>
  <div class="nav-header">
    <Fold
      style="width: 1.8em; height: 1.8em; margin-right: 8px"
      class="fold"
      @click="changeCollapse"
      v-show="!isCollapse"
    />
    <Expand
      style="width: 1.8em; height: 1.8em; margin-right: 8px"
      class="fold"
      @click="changeCollapse"
      v-show="isCollapse"
    />
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- <el-button @click="outLogin" class="outlogin-btn">退出登录</el-button> -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <img src="@/assets/img/tx.png" alt="" class="avatar" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
export default { name: 'nav-header' }
</script>
<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { loginStore } from '@/store/login'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import localCache from '../../utils/cache'
const route = useRoute()
const router = useRouter()
const store = loginStore()
const { isCollapse } = storeToRefs(store)
const changeCollapse = () => {
  store.isCollapse = !isCollapse.value
}
const outLogin = () => {
  localCache.clearCache()
  router.push({
    path: '/login'
  })
}
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
  .fold {
    margin-right: 10px;
    cursor: pointer;
  }
  .avatar {
    margin-right: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
