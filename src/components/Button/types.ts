export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'submit' | 'reset' | 'button'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  nativeType?: NativeType
  autofocus?: boolean
  // 给Button组件添加Icon⬇️
  icon?: string
  loading?: boolean
}

export interface ButtonInstance {
  ref: HTMLButtonElement
}
