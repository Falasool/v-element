<!--
 * Button
 * @author: Ya
 * @since: 2024-03-05
 * Button.vue
-->
<script lang="ts">
import type { ButtonProps } from './types'
defineProps<ButtonProps>()
</script>

<template>
  <button
    class="zZ-button"
    :class="{
      'is-plain': plain,
    }"
  ></button>
</template>

<style scoped></style>
