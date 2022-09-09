import { defineStore } from 'pinia'
import { beautifulStore } from './beautiful'
import { storeToRefs } from 'pinia'
const store = beautifulStore()
const { headerColor,mainColor} = storeToRefs(store)
import { getAccount } from '@/api/accountLogin'
import localCache from '../utils/cache'
import { getMenu } from '@/api/menu'
interface Account {
  username: string
  password: string
}
export const loginStore = defineStore('login', {
  persist: true,
  state: () => {
    return {
      profile: {},
      menus:[] as any[],
      isCollapse:false,
      tabList:[] as any[],
      activeName:'后台首页',
      headerColor,
      mainColor
    }
  },
  actions: {
    async loginAction(account: Account) {
      const res: any = await getAccount(account)
      localCache.setCache('token', res.data.token)
      this.profile = res.data
      const menu: any = await getMenu()
      this.menus = menu.data
    }
  }
})
