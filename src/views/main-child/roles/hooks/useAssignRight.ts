import { reactive, ref } from 'vue'
import { roleStore } from '@/store/roles'
export function useAssignRight() {
  const store = roleStore()
  let roleId = ref(0) //角色id
  let assignRightsdialogVisible = ref(false) //控制分配权限对话框的显示
  const treeRef = ref() //树结构的ref
  const defaultkeys = reactive([]) //默认展开的节点
  //树结构配置
  const rightsTreeProps = reactive({
    children: 'children',
    label: 'authName'
  })
  //点击分配权限按钮获得节点id
  const getRights = (node: any, id: number) => {
    getChildKeys(node, defaultkeys)
    roleId.value = id
    assignRightsdialogVisible.value = true
  }
  //点击确认分配权限
  const assignRight = () => {
    const keys = [...treeRef.value.getCheckedKeys(), ...treeRef.value.getHalfCheckedKeys()]
    store.assignRoleRights({ id: roleId.value, rights: keys.join(',') })
    assignRightsdialogVisible.value = false
  }
  //分配权限对话框关闭
  const assignRightsDialogClose = () => {
    defaultkeys.splice(0)
  }
  //获得所有子节点
  const getChildKeys = (node: any, arr: any[]) => {
    if (!node.children) {
      return arr.push(node.id)
    }
    node.children.forEach((item: any) => {
      getChildKeys(item, arr)
    })
  }
  return {
    roleId,
    assignRightsdialogVisible,
    treeRef,
    defaultkeys,
    rightsTreeProps,
    getRights,
    assignRight,
    assignRightsDialogClose
  }
}
