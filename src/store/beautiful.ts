import { defineStore } from 'pinia'
export const beautifulStore = defineStore('beautiful', {
  persist: true,
  state: () => {
    return {
      headerColor: '',
      headerIndex: 0,
      mainColor: '',
      mainIndex: 0
    }
  },

})
