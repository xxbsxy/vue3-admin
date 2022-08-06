<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
export default { name: 'Login' }
</script>
<script setup lang="ts">
import LoginPanel from './child/Login-panel.vue'
</script>
<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login-bg.svg);
}
</style>
