import myRequest from './api'

export function getRoles() {
  return myRequest.request({
    url: '/roles',
  })
}
export function editRoles(id:number,roleName:string,roleDesc?:string) {
  return myRequest.request({
    url: `roles/${id}`,
    method:'put',
    data:{
      roleName,
      roleDesc
    }
  })
}
export function deleteRoles(id:number) {
  return myRequest.request({
    url: `roles/${id}`,
    method:'delete',
  })
}
export function addRoles(roleName:string,roleDesc?:string) {
  return myRequest.request({
    url: `roles`,
    method:'post',
    data:{
      roleName,
      roleDesc
    }
  })
}

export function assignRoleRights(roleId:number,rids:string) {
  return myRequest.request({
    url: `roles/${roleId}/rights`,
    method:'post',
    data:{
      rids
    }
  })
}
