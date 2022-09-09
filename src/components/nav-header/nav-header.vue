<template>
  <div class="nav-header">
    <div class="left-area">
      <div class="logo">
        <img src="@/assets/img/logo.svg" alt="" />
        <span class="title">Vue3-Admin</span>
      </div>
      <div class="icons">
        <Fold
          style="width: 1.8em; height: 1.8em; margin-right: 8px"
          class="fold"
          @click="changeCollapse"
          v-show="!isCollapse"
          color="#fff"
        />
        <Expand
          style="width: 1.8em; height: 1.8em; margin-right: 8px"
          class="fold"
          @click="changeCollapse"
          v-show="isCollapse"
          color="#fff"
        />
      </div>
    </div>
    <div class="right-area">
      <img src="@/assets/img/tx.png" class="avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="username">admin</span>
          <ArrowDown style="width: 1em; height: 1em" color="#fff" class="arrow-down" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'nav-header' }
</script>
<script setup lang="ts">
import { Fold, Expand, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
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
  ElMessageBox.confirm('是否退出登录?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '退出登录成功'
    })
    localCache.clearCache()
    router.push({
      path: '/login'
    })
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
  .left-area {
    display: flex;
    align-items: center;
    height: 100%;
    .logo {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        width: 40px;
        height: 40px;
      }
      .title {
        margin-left: 5px;
        color: #fff;
      }
    }
    .icons {
      margin-left: 55px;
      cursor: pointer;
    }
  }

  .right-area {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .username {
      margin-left: 8px;
      color: #fff;
    }
    .arrow-down {
      position: relative;
      left: 5px;
      top: 2px;
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
