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
        <tag-list></tag-list>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="8">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
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
import TabList from '@/components/tag-list/tag-list'
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
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease;
    }
    .fade-enter-active {
      transition-delay: 0.2s;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
