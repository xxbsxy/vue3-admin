import myRequest from './api'

export function getMenu() {
  return myRequest.request({
    url: '/menus',
  })
}
