<template>
  <el-drawer v-model="showDrawer" :title="title" :size="size" @closed="drawerClosed">
    <div class="content">
      <div class="form">
        <slot></slot>
      </div>
      <div class="btns">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const prop = defineProps({
  title: {
    type: String
  },
  size: {
    type: String,
    default: '50%'
  }
})
let showDrawer = ref(false)
const emit = defineEmits(['submit', 'closed'])
//提交
const submit = () => {
  emit('submit')
}
//关闭的回调
const drawerClosed = () => {
  emit('closed')
}
//打开
const open = () => {
  showDrawer.value = true
}
//关闭
const close = () => {
  showDrawer.value = false
}
defineExpose({
  open,
  close
})
</script>
<style scoped lang="less">
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  .btns {
    height: 50px;
  }
  .form {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
