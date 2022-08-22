<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default { name: 'App' }
</script>
<script setup lang="ts"></script>
<style scoped lang="less">
@import './assets/css/base.css';
@import './assets/css/globe.css';
.app {
  height: 100%;
}
</style>
