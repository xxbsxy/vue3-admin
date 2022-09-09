<template>
  <div class="beautiful">
    <h2>头部美化</h2>
    <el-row :gutter="20" class="header-color">
      <el-col :span="5" v-for="(item, index) in headerColorList" :key="index">
        <div
          class="header-box"
          :style="{ backgroundColor: item.color }"
          @click="changHeaderColor(item.color, index)"
        >
          <img src="@/assets/img/beauiful.svg" alt="" class="img" v-show="headerIndex === index" />
        </div>
        <p class="title">{{ item.title }}</p>
      </el-col>
    </el-row>
    自定义颜色 <el-color-picker v-model="headerColor" show-alpha @change="headerColorChange" />
    <h2>主体美化</h2>
    <el-row :gutter="20" class="header-color">
      <el-col :span="5" v-for="(item, index) in mainColorList" :key="index">
        <div
          class="header-box"
          :style="{ backgroundColor: item.color }"
          @click="changMainColor(item.color, index)"
        >
          <img src="@/assets/img/beauiful.svg" alt="" class="img" v-show="mainIndex === index" />
        </div>
        <p class="title">{{ item.title }}</p>
      </el-col>
    </el-row>
    自定义颜色 <el-color-picker v-model="mainColor" show-alpha @change="mainColorChange" />
    <p class="des">Copyright © 2013 by Perchouli Shanzhai to Nipponcolors</p>
    <p class="buttom">
      参看: 色谱 中科院科技情报编委会名词室.科学出版社,1957. Adobe RGB / CMYK FOGRA39, Dot Gain 15%
      Screenshot沪ICP备17025116号-2
    </p>
  </div>
</template>

<script lang="ts">
export default { name: 'Beatuiful' }
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import { beautifulStore } from '@/store/beautiful'
import { storeToRefs } from 'pinia'
const store = beautifulStore()
const { headerColor, mainColor, headerIndex, mainIndex } = storeToRefs(store)
const headerColorList = reactive([
  { title: '默认色', color: '#4338ca' },
  { title: '太阳橙', color: '#f08d01' },
  { title: '山茶粉', color: '#e9617b' },
  { title: '宝石红', color: '#c80851' },
  { title: '风信紫', color: '#c4a9c0' }
])
const mainColorList = reactive([
  { title: '默认色', color: '#f1f2f6' },
  { title: '孔雀蓝', color: '#00a4c5' },
  { title: '水晶紫', color: '#7f4985' },
  { title: '满江红', color: '#e92b77' },
  { title: '松霜绿', color: '#82a68c' }
])
//头部颜色改变
const changHeaderColor = (headerColor: string, index: number) => {
  store.headerIndex = index
  store.headerColor = headerColor
}
const headerColorChange = (newColor: string) => {
  store.headerColor = newColor
  store.headerIndex = -1
}
//主体颜色改变
const changMainColor = (mainColor: string, index: number) => {
  store.mainIndex = index
  store.mainColor = mainColor
}
const mainColorChange = (newColor: string) => {
  store.mainColor = newColor
  store.mainIndex = -1
}
</script>
<style scoped lang="less">
.beautiful {
  padding: 20px 24px;
  background-color: #fff;
  .header-color {
    .header-box {
      position: relative;
      height: 150px;
      border-radius: 10px;
      cursor: pointer;
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .title {
      text-align: center;
    }
  }
  .des {
    margin-top: 40px;
    color: rgb(144, 144, 144);
  }
  .buttom {
    color: rgb(144, 144, 144);
  }
}
</style>
