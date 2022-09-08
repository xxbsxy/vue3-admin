<template>
  <div class="login-account">
    <el-form
      label-position="right"
      label-width="60px"
      :model="formAccount"
      style="max-width: 460px"
      :rules="accountRules"
      ref="formRef"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="formAccount.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formAccount.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
export default { name: 'Login-account' }
</script>
<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus'
import { reactive, ref, nextTick } from 'vue'
import localCache from '@/utils/cache'
import { loginStore } from '@/store/login'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = loginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
const formAccount = reactive({
  username: localCache.getCache('username') ?? 'admin',
  password: localCache.getCache('password') ?? '123456'
})
const accountRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 12, message: '账号要在4-12个数字之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码要在6-12个数字之间', trigger: 'blur' }
  ]
})
//点击登录
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((vaild: boolean) => {
    if (vaild) {
      //判断是否记录密码
      if (isKeepPassword) {
        //缓存
        localCache.setCache('username', formAccount.username)
        localCache.setCache('password', formAccount.password)
      } else {
        localCache.deleteCache('username')
        localCache.deleteCache('password')
      }
      store.loginAction({ ...formAccount }).then(() => {
        router.push({
          path: '/home'
        })
      })
    }
  })
}
defineExpose({
  loginAction
})
</script>
<style scoped lang="less"></style>
