<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="tabsName">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><PhoneFilled /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="password">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link :underline="false">忘记密码</el-link>
    </div>
    <div class="login-buttom">
      <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'Login-panel' }
</script>
<script setup lang="ts">
import { UserFilled, PhoneFilled } from '@element-plus/icons-vue'
import LoginAccount from './Login-account.vue'
import LoginPhone from './Login-phone.vue'
import { ref } from 'vue'
const accountRef = ref<InstanceType<typeof LoginAccount>>()
let isKeepPassword = ref(true)
let tabsName = ref('account')
//登录逻辑
const handleLoginClick = () => {
  if (tabsName.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  }
}
</script>
<style scoped lang="less">
.login-panel {
  margin-bottom: 200px;
  width: 320px;
  .title {
    text-align: center;
  }
  .password {
    display: flex;
    justify-content: space-between;
  }
  .login-buttom {
    .login-btn {
      margin-top: 4px;
      width: 100%;
    }
  }
}
</style>
