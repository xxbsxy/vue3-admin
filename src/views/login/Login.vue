<template>
  <div class="login">
    <el-row>
      <el-col :lg="16" :md="12" class="left-area">
        <h1>欢迎光临</h1>
      </el-col>
      <el-col :lg="8" :md="12" class="right-area">
        <div class="content">
          <h1>欢迎回来</h1>

          <el-form
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="loginRules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                :prefix-icon="UserFilled"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="PhoneFilled"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button class="login-btn" color="#626aef" @click="login">登录</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default { name: 'Login' }
</script>
<script setup lang="ts">
import { UserFilled, PhoneFilled } from '@element-plus/icons-vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { loginStore } from '@/store/login'
import type { ElForm, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = loginStore()
const loginFormRef = ref<InstanceType<typeof ElForm>>()
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 12, message: '账号要在4-12个数字之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码要在6-12个数字之间', trigger: 'blur' }
  ]
})
//点击登录按钮登录
const login = () => {
  loginFormRef.value?.validate((isvalidate: boolean) => {
    if (isvalidate) {
      store.loginAction({ ...loginForm }).then(() => {
        router.push({
          path: '/home'
        })
      })
    }
  })
}
//按回车登录
const onKeyUp = (e: any) => {
  if (e.key === 'Enter') {
    login()
  }
}
//监听键盘事件
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
//移除键盘事件
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>
<style scoped lang="less">
.login {
  height: 100%;
  .el-row {
    height: 100%;
  }
  .left-area,
  .right-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    width: 250px;
  }
  .left-area {
    background-color: #6366f1;
    h1 {
      color: #fff;
      font-size: 50px;
    }
  }
  .right-area {
    .login-btn {
      width: 100%;
      border-radius: 10px;
    }
    h1 {
      text-align: center;
    }
  }
}
</style>
