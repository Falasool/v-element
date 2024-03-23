<!--
 * Icons
 * @author: Ya
 * @since: 2024-03-14
 * Icons.vue
-->
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IconProps } from './types'
import { omit } from 'lodash-es'
import { computed } from 'vue'
defineOptions({
  //命名组件
  name: 'ZzIcon',
  // 停止透传到root组件 配合v-bind="$attrs"使用
  inheritAttrs: false,
})
const props = defineProps<IconProps>()
// 使用computed：因为omit只在setup时更新一次，我们需要computed让他持续更新
const filterdProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i
    class="Zz-icon"
    :class="{ [`Zz-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterdProps"></font-awesome-icon>
  </i>
</template>

<style scoped></style>
