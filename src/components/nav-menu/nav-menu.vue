<template>
  <div class="logo">
    <img src="../../assets/img/logo.svg" alt="" />
    <span class="title" v-show="!isCollapse">Vue3-Admin</span>
  </div>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    active-text-color="#fff"
    background-color="#00162a"
    text-color="#fff"
    :collapse="isCollapse"
    router
    :collapse-transition="false"
  >
    <el-sub-menu v-for="item in menus" :index="item.id + ''" :key="item.id">
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

        <TrendCharts
          style="width: 1em; height: 1em; margin-right: 8px"
          v-else-if="item.authName === '数据统计'"
        />
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path">
          <!-- <Menu style="width: 1em; height: 1em; margin-right: 8px" />  -->
          {{ child.authName }}
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
export default { name: 'App' }
</script>
<script setup lang="ts">
import { UserFilled, Goods, DocumentCopy, Box, TrendCharts, Menu } from '@element-plus/icons-vue'
import { loginStore } from '@/store/login'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
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
