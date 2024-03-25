import { ComponentInternalInstance, VNode } from 'vue'

export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'error'
  onDestroy: () => void
  offset?: number
  id: string
}
// export interface MessageEmits {
//   (e: 'change', value)
// }

export interface MessageContext {
  id: string
  vnode: VNode
  props: MessageProps
  // Vue提供类型：ComponentInternalInstance组件内部实例
  vm: ComponentInternalInstance
}

export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id'>
