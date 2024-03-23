<!--
 * Collapse
 * @author: Ya
 * @since: 2024-03-09
 * Collapse.vue
-->
<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
  name: 'ZzCollapseItem',
})
// v-model支持
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
// 代表打开的item的数组
const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)
// 手风琴特效只能展开一个item
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item')
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    // indexOf(x)返回x首次出现的坐标，或者-1
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      // 从index开始删除1位
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(item)
    }
    emits('update:modelValue', activeNames.value)
    emits('update:change', activeNames.value)
  }
}
// 向Collapse的所有字组件提供{activeNames, handleItemClick}
// provide(key, value)
provide(collapseContextKey, { activeNames, handleItemClick })
</script>

<template>
  <div class="Zz-collapse">
    <slot></slot>
  </div>
</template>

<style scoped></style>
