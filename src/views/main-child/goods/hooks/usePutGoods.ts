import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { goodsStore } from '@/store/goods'
export function usePutGoods() {
  const store = goodsStore()
  let addGoodsRef = ref()//添加表单组件的ref
  let editorRef = ref()//富文本组件的ref
  let selectKeys = ref([]) //联级选择框绑定的数组
  const deawerRef = ref() //抽屉组件的ref
  let acticeIndex = ref<any>('0') //活跃的tab名称
//联级选择框的规则
  const cascaderProps = {
    value: 'cat_id',
    label: 'cat_name',
    children: 'children',
    expandTrigger: 'hover'
  }
  //添加商品表单
  const addGoodsForm = reactive({
    goods_name: '',
    goods_price: '',
    goods_weight: '',
    goods_number: '',
    goods_introduce: '',
    goods_cat: ''
  })
  //添加商品的规则
  const addGoodsRules = reactive({
    goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
    goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
    goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }]
  })
  //联级选择框选择回调
  const handleCascaderchange = (newKeys: any) => {
    selectKeys.value = newKeys
    addGoodsForm.goods_cat = newKeys.join(',')
  }
  //tabs切换之前回调
  const beforeLeave = () => {
    if (selectKeys.value.length !== 3) {
      ElMessage.error('请先选择商品分类')
      return false
    }
    return true
  }
  //关闭抽屉组件清空内容
  const deawerClosed = () => {
    addGoodsRef.value.resetFields()
    editorRef.value.setText('')
    acticeIndex.value = 0
  }
  //提交商品
  const submitGoods = () => {
    addGoodsRef.value.validate((isValid: boolean) => {
      if (isValid) {
        addGoodsForm.goods_introduce = editorRef.value.getText()
        store
          .putGoods({
            goods_name: addGoodsForm.goods_name,
            goods_price: Number(addGoodsForm.goods_price),
            goods_weight: Number(addGoodsForm.goods_weight),
            goods_number: Number(addGoodsForm.goods_number),
            goods_introduce: addGoodsForm.goods_introduce,
            goods_cat: addGoodsForm.goods_cat
          })
          .then(() => {
            store.getGoodsList({ pagenum: 1, pagesize: 15 })
            addGoodsRef.value.resetFields()
            deawerRef.value.close()
            editorRef.value.setText('')
            acticeIndex.value = 0
          })
      }
    })
  }
  return {
    addGoodsRef,
    editorRef,
    selectKeys,
    deawerRef,
    addGoodsForm,
    addGoodsRules,
    cascaderProps,
    acticeIndex,
    beforeLeave,
    deawerClosed,
    submitGoods,
    handleCascaderchange
  }
}
