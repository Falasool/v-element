<!--
 * Message
 * @author: Ya
 * @since: 2024-03-25
 * Message.vue
-->
<script setup lang="ts">
import Icon from '../Icons/Icons.vue'
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { MessageProps } from './types'
import RenderVnode from '../../common/RenderVnode'
import { getLastBottomOffset } from './method'

defineOptions({
  name: 'YaMessage',
})
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
})
// const emits = defineEmits<MessageEmits>()
const messageRef = ref<HTMLDivElement>()
// const instance = getCurrentInstance()
// height 是message组件的高度
const height = ref(0)
// 上一个message组件的下端
const lastOffset = computed(() => {
  getLastBottomOffset(props.id)
})
const topOffset = computed(() => {
  props.offset + lastOffset.value
})
const bottomOffset = computed(() => {
  height.value + topOffset.value
})
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
}))
const visible = ref(false)
const startTimer = () => {
  if (props.duration === 0) {
    return
  }
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}
// async: 希望dom更新后再拿height值，配合nextTick
onMounted(async () => {
  visible.value = true
  startTimer()
  await nextTick()
  // 非空类型断言！
  // 配合ref=“”使用，getBoundingClientRect：返回element的大小及相对视口的位置
  height.value = messageRef.value!.getBoundingClientRect().height
})
watch(visible, (newValue) => {
  if (!newValue) {
    props.onDestroy
  }
})
defineExpose({
  // 暴露出去给下一个message组件实例使用
  bottomOffset,
})
</script>

<template>
  <div
    class="Ya-message"
    role="alert"
    :class="{
      [`Ya-message--${type}`]: type,
      'is-close': showClose,
    }"
    :style="cssStyle"
    v-show="visible"
    ref="messageRef"
  >
    <div class="Ya-message__content">
      <slot><RenderVnode :vNode="message" v-if="message"></RenderVnode></slot>
    </div>

    <div class="Ya-message__close" v-if="showClose">
      <Icon icon="xmark" @click.stop="($event) => (visible = false)"></Icon>
    </div>
  </div>
</template>

<style scoped></style>
