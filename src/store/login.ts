import { defineStore } from 'pinia'
import { getAccount } from '@/api/accountLogin'
interface Account {
  username: string
  password: string
}
export const loginStore = defineStore('login', {
  state: () => {
    return {}
  },
  actions: {
    async loginAction(account: Account) {
      const res = await getAccount(account)
      console.log(res)
    }
  }
})
