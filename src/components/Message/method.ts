import { render, h, reactive } from 'vue'
import { CreateMessageProps,MessageContext } from './types'
import MessageConstructor from './Message.vue'

let seed = 1
const instances: MessageContext[]=reactive([])
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  // 创建DOM节点
  const container = document.createElement('div')
  const destory = () => {
    // 删除数组中的实例
    // 先在instances中寻找对应item的index
    const idx =instances.findIndex(instance=>instance.id ===id)
    // 找不到终止程序
    if(idx===-1)return
    // 找到了，从idx开始删除1位
    instances.splice(idx,1)
    // 清除实例（卸载）
    render(null, container)
  }
  const newProps = [
    ...props,
    id
    onDestory: destory,
    
  ]
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)

  // `firstElementChild!` 表示 变量 firstElementChild 不为 null
  // 非空断言操作符
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props:newProps
  }
  instances.push(instance)
  return instance
}

export const getLastInstance =()=>{
  // at方法，接收索引返回item，-1即倒数第一个item
  return instances.at(-1)
}

export const getLastBottomOffset =(id:string)=>{
  // 查找当前组件的index
  const idx = instances.findIndex(instance => instance.id ===id)
  if(idx<=0)return 0 else{
    // 前一项的inxex
    const prev = instances[idx-1]
    // 前一项向外暴露的bottomOffset等
    return prev.vm.exposed!.bottomOffset.value
  }

}