import myRequest from './api'

export function getCategories(type?:number) {
  return myRequest.request({
    url: '/categories',
    params:{
      type
    }
  })
}
export function deleteCategories(id:number) {
  return myRequest.request({
    url: `categories/${id}`,
    method:'delete'
  })
}
export function putCategories(id:number,name:string) {
  return myRequest.request({
    url: `categories/${id}`,
    method:'put',
    data:{
      cat_name:name
    }
  })
}
export function addCategories(cat_pid:number,cat_name:string,cat_level:number) {
  return myRequest.request({
    url: 'categories',
    method:'post',
    data:{
      cat_pid,
      cat_name,
      cat_level
    }
  })
}
