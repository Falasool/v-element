<!--
 * Button
 * @author: Ya
 * @since: 2024-03-05
 * Button.vue
-->
<script lang="ts">
/*
 * 定义组件的一些属性，如组件名称...
 */
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ZzButton',
})
</script>

<script setup lang="ts">
import type { ButtonProps } from './types'
import { ref } from 'vue'
/*
 * withDefaults作用：NativeType默认值为button
 */
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})
/*
 * 在Vue中获取DOM节点的方法：ref属性（类似id）及模板引用
 * const _ref 用于存放该元素的引用
 */
const _ref = ref<HTMLButtonElement>()
/*
 * 把ref="_ref"的DOM节点即Button组件实例暴露出去
 */
defineExpose({
  ref: _ref,
})
</script>
<!-- 
    :class="{
      [`Zz-button--${type}`]: type,
      [`Zz-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    // :原生属性=“types.ts定义的type”，这样 Button 组件就能继续用原生<button>的属性了
    :disabled="disabled"
    :autofocus="autofocus"
    :NativeType="NativeType"
   -->
<template>
  <button
    ref="_ref"
    class="Zz-button"
    :class="{
      [`Zz-button--${type}`]: type,
      [`Zz-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style></style>
