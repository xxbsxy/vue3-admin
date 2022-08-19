<template>
  <el-container class="container">
    <el-aside :class="!isCollapse ? 'aside' : 'collapse-aside'">
      <nav-menu></nav-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <nav-header></nav-header>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default { name: 'Main' }
</script>
<script setup>
import NavMeun from '@/components/nav-menu/nav-menu.vue'
import NavHeader from '@/components/nav-header/nav-header.vue'
import { loginStore } from '@/store/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { isCollapse } = storeToRefs(store)
</script>
<style scoped lang="less">
.container {
  height: 100%;
  .header {
    background-color: #ffffff;
  }
  .aside {
    width: 210px;
    background-color: #0c2135;
  }
  .collapse-aside {
    width: 64px;
    background-color: #0c2135;
  }
  .main {
    background-color: #f1f2f6;
  }
}
</style>
