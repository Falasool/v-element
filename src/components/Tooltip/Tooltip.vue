<!--
 * Tooltip
 * @author: Ya
 * @since: 2024-03-22
 * Tooltip.vue
-->
<script setup lang="ts">
import { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper, Instance } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside'
defineOptions({
  name: 'ZzTooltip',
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
})

const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
// 展示内容的节点
const popperNode = ref<HTMLElement>()
// 触发节点
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
// dynamic events binding
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const popperOptions = computed(() => {
  return {
    // 处理优先级
    placement: props.placement,
    ...props.popperOptions,
  }
})

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}
const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen && !props.manual) {
    close()
  }
})
const attachEvents = () => {
  /*
   * 当触发方式为hover，给let events 添加两个键值对，即两个事件
   * 当触发方式为click，给let events 添加一个键值对，即一个事件
   */
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
// 监听触发源，当触发方式改变时，init events
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      // clear the events
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)
// isOpen = true 即 展示tooltip时，创建 popper实例
// flush:'post' watch更新时机：DOM更新后
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      // 手动模式下，清空events事件
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)
watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (popperNode.value && triggerNode.value) {
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        )
      } else {
        // 销毁popperInstance
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)
onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  show: open,
  hide: close,
})
</script>
<!-- 
  trigger：触发键
  popper：内容
 -->

<template>
  <div class="Zz-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="Zz-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div class="Zz-tooltip__popper" ref="popperNode" v-if="isOpen">
        <slot name="content">{{ content }}</slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.Zz-tooltip__trigger,
.Zz-tooltip__popper {
  border: 1px solid #ccc;
}
</style>
