import { cateroriesStore } from '@/store/categories'
import { reactive, ref } from 'vue'
export function useAddCategories() {
  const store = cateroriesStore()
  let addCategoriesDialogVisible = ref(false) //添加分类对话框的显示
  //联级选择器规则
  const cascaderProps = {
    value: 'cat_id',
    label: 'cat_name',
    children: 'children',
    expandTrigger: 'hover',
    checkStrictly: true
  }
  //添加分类的表单
  const addCategoriesform = reactive({
    cat_name: '',
    cat_pid: 0,
    cat_level: 0
  })
  //添加分类的规则
  const addCategoriesRules = reactive({
    cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
  })
  let selectKeys = [] as any[]
  //父级选择项发生变化
  const handleCategoriesChange = (value: Array<number>) => {
    selectKeys = value
    console.log(selectKeys);
    addCategoriesform.cat_level = selectKeys.length
    addCategoriesform.cat_pid = selectKeys[selectKeys.length - 1]
  }
  //点击确定添加分类
  const addCategories = () => {
    store.addCategories(addCategoriesform).then(() => {
      store.getCategories()
      addCategoriesform.cat_name='',
      addCategoriesform.cat_pid = 0
      addCategoriesform.cat_level = 0

    })
    addCategoriesDialogVisible.value = false
  }
  //打开对话框
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
