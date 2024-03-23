<!--
 * CollapseItem
 * @author: Ya
 * @since: 2024-03-09
 * CollapseItem.vue
-->
<script setup lang="ts">
import { CollapseItemProps, collapseContextKey } from './types'
import Icon from '../Icons/Icons.vue'
import { computed, inject } from 'vue'
defineOptions({
  name: 'ZzCollapseItem',
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
/*
 * isActive: 判断当前CollapseItem是否展开
 * collapseContext：inject 从 Collapse组件provide的{ activeNames, handleItemClick }
 * activeNames：活跃item组成的数组
 * handleItemClick：让item切换展开/折叠状态的方法
 * props：
 */
const isActive = computed(() => {
  // 可选链：es11
  return collapseContext?.activeNames.value.includes(props.name)
})
const handleClick = () => {
  /*
   * 如果disabled为true（意味着这个item被禁用），
   * 那么return语句会被执行。return在这里用来立即结束函数的执行，
   * 即不继续执行后面的代码。
   */
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}
// transition 动画相关
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<template>
  <div
    class="Zz-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="Zz-collapse-item__header"
      id="`item-header-${name}`"
      @click="handleClick"
    >
      <!-- 
        具名slot有内容就显示，没有就渲染默认的{{ title }}
       -->
      <slot name="title"> {{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="Zz-collapse-item__wrapper" v-show="isActive">
        <div class="Zz-collapse-item__content" id="`item-content-${name}`">
          <slot> </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
