import { cateroriesStore } from '@/store/categories'
import { reactive, ref } from 'vue'

export function useAddCategories() {
  const store = cateroriesStore()
  let addCategoriesDialogVisible = ref(false)
  const cascaderProps = {
    value: 'cat_id',
    label: 'cat_name',
    children: 'children',
    expandTrigger: 'hover',
    checkStrictly: true
  }
  const addCategoriesform = reactive({
    cat_name: '',
    cat_pid: 0,
    cat_level: 0
  })
  const addCategoriesRules = reactive({
    cat_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
  })
  const selectKeys = [] as any[]
  //父级选择项发生变化
  const handleCategoriesChange = (value: Array<any>) => {
    selectKeys.length = 0
    for (let i = 0; i < value.length; i++) {
      selectKeys.push(value[i])
    }
    console.log(selectKeys);
    addCategoriesform.cat_level = selectKeys.length
    if(selectKeys.length!==0) {
       addCategoriesform.cat_pid = selectKeys[selectKeys.length - 1]
    }

  }
  //点击确定添加分类
  const addCategories = () => {
    store.addCategories(addCategoriesform).then(() => {
      store.getCategories()
    })
    addCategoriesDialogVisible.value = false
  }
  const open = () => {
    addCategoriesDialogVisible.value = true
  }
  return {
    addCategoriesDialogVisible,
    cascaderProps,
    addCategoriesform,
    addCategoriesRules,
    addCategories,
    handleCategoriesChange,
    open,
  }
}
