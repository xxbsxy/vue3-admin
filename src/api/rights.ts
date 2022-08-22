import myRequest from './api'

export function getRightsList() {
  return myRequest.request({
    url: 'rights/list',
  })
}
export function getRightsTree() {
  return myRequest.request({
    url: 'rights/tree',
  })
}

