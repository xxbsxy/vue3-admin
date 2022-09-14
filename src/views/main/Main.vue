<template>
  <el-container class="container">
    <el-header class="header" :style="{ backgroundColor: headerColor }">
      <nav-header></nav-header>
    </el-header>
    <el-container>
      <el-aside :class="!isCollapse ? 'aside' : 'collapse-aside'">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main class="main" :style="{ backgroundColor: mainColor }">
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

<script setup>
import NavMeun from '@/components/nav-menu/nav-menu.vue'
import NavHeader from '@/components/nav-header/nav-header.vue'
import TabList from '@/components/tag-list/tag-list'
import { loginStore } from '@/store/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { isCollapse, headerColor, mainColor } = storeToRefs(store)
</script>
<style scoped lang="less">
.container {
  height: 100%;
  .header {
    height: 64px;
    background-color: #4338ca;
    transition: background-color 0.4s ease-in;
  }
  .aside {
    width: 210px;
  }
  .collapse-aside {
    width: 64px;
  }
  .main {
    background-color: #f1f2f6;
    transition: background-color 0.4s ease-in;
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
