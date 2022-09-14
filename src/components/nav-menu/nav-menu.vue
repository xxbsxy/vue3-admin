<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    router
    :collapse-transition="false"
  >
    <el-sub-menu index="/">
      <template #title>
        <HomeFilled style="width: 1em; height: 1em; margin-right: 8px" />
        <span>后台首页</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/home"> 首页 </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu
      v-for="item in menus.slice(0, menus.length - 1)"
      :index="item.id + ''"
      :key="item.id"
    >
      <template #title>
        <UserFilled
          style="width: 1em; height: 1em; margin-right: 8px"
          v-if="item.authName === '用户管理'"
        />
        <DocumentCopy
          style="width: 1em; height: 1em; margin-right: 8px"
          v-else-if="item.authName === '订单管理'"
        />
        <Goods
          style="width: 1em; height: 1em; margin-right: 8px"
          v-else-if="item.authName === '商品管理'"
        />
        <Box
          style="width: 1em; height: 1em; margin-right: 8px"
          v-else-if="item.authName === '权限管理'"
        />
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="child in item.children" :key="child.id" :index="'/' + child.path"
          >{{ child.authName }}
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="/beautiful">
      <template #title>
        <BrushFilled style="width: 1em; height: 1em; margin-right: 8px" />
        <span>页面美化</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/beautiful"> 美化 </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
export default { name: 'App' }
</script>
<script setup lang="ts">
import {
  UserFilled,
  Goods,
  DocumentCopy,
  Box,
  HomeFilled,
  BrushFilled
} from '@element-plus/icons-vue'
import { loginStore } from '@/store/login'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = loginStore()
const { menus, isCollapse } = storeToRefs(store)
</script>
<style scoped lang="less">
.logo {
  img {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 40px;
    height: 40px;
  }
  .title {
    position: relative;
    bottom: 20px;
    left: 6px;
    color: #fff;
  }
}
</style>
