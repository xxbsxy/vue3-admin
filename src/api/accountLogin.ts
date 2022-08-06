import myRequest from './api'

export function getAccount(account: any) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}
