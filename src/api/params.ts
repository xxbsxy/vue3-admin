interface AddAttributesRule{
  id:number,
  attr_sel:Array<string>,
  attr_name:string,
  attr_vals?:string
}
interface PutAttributesRule{
  id:number,
  attrid:number,
  attr_sel:Array<string>,
  attr_name:string,
  attr_vals?:string
}
import myRequest from './api'
export function getAttributes(id:number,sel:Array<string>) {
  return myRequest.request({
    url: `categories/${id}/attributes`,
    params:{
      sel
    }
  })
}
export function addAttributes(data:AddAttributesRule) {
  return myRequest.request({
    url: `categories/${data.id}/attributes`,
   method:'post',
   data
  })
}
export function deleteAttributes(id:number,attrid:number) {
  return myRequest.request({
    url: `categories/${id}/attributes/${attrid}attrid`,
   method:'delete'
  })
}
export function putAttributes(data:PutAttributesRule) {
  return myRequest.request({
    url: `categories/${data.id}/attributes/${data.attrid}attrid`,
   method:'put',
   data
  })
}
