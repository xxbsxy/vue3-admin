<template>
  <div class="login-phone">
    <el-form
      label-position="right"
      label-width="70px"
      :model="formPhone"
      style="max-width: 460px"
      :rules="phoneRules"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formPhone.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div class="password">
          <el-input v-model="formPhone.password" type="password" />
          <el-button type="primary" class="btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
export default { name: 'Login-phone' }
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'
const formPhone = reactive({
  phone: '',
  password: ''
})
const phoneRules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 4, max: 12, message: '账号要在4-12个数字之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
})
</script>
<style scoped lang="less">
.password {
  display: flex;
  .btn {
    margin-left: 10px;
  }
}
</style>
