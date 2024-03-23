import { Placement, Options } from '@floating-ui/core'

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  manual?: boolean
  placement?: Placement
  popperOptions?: Partial<Options>
  transition?: string
}
export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
