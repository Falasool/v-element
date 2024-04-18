import type { NameType } from '../Collapse'

export interface AlertProps {
  content?: string
  type?: NameType
  effect?: 'light' | 'dark'
  // 右侧关闭按钮（允许用户关闭alert）
  closable: boolean
}
export interface AlertEvents {
  e: (e: 'close') => void
}
