<!--
 * Dropdown
 * @author: Ya
 * @since: 2024-03-23
 * Dropdown.vue
-->
<script setup lang="ts">
import { Ref, ref } from 'vue'
import {
  DropdownProps,
  DropdownInstance,
  DropdownEmits,
  MenuOption,
} from './types'
import { TooltipInstance } from '../Tooltip/types'

defineOptions({
  name: 'YaDropdown',
})

const props = defineProps<DropdownProps>()
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emits('select', e)
}
// defineExpose<DropdownInstance>({
//   show: tooltipRef.value.show,
//   hide: tooltipRef.value.hide,
// })
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>
<!-- 
  template生成一个空节点
  使用<template>标签但不包含任何内容或具体元素时，
  可以理解为生成一个空节点。这意味着它不会渲染为实际的DOM元素，
  但可以用作条件渲染或循环中的占位符，
  允许你控制是否渲染内部的内容或组件，
  而不影响外部布局。
  这种方式常用于只想根据条件渲染一组元素而不引入额外父元素的场景。
  -->
<template>
  <div class="Ya-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popperOptions="popperOptions"
      :openDelay="openDelay"
      :closeDelay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="Ya-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <!-- 分隔线 separator -->
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            ></li>
            <!-- Menu内容 -->
            <li
              class="Ya-dropdown__item"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }"
              :id="`dropdown-item-${item.key}`"
              @click="itemClick(item)"
            >
              {{ item.label }}
            </li></template
          >
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style scoped></style>
