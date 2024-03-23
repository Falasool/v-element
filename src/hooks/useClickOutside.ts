import { Ref, onMounted, onUnmounted } from 'vue'
// Ref是ref的返回值
const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      // Node.contains(),原生方法，表示一个节点是否是给定节点的后代，返回一个boolean
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}
export default useClickOutside
