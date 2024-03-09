<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ButtonInstance } from './components/Button/types'
import { onMounted, ref } from 'vue'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value?.ref)
  }
})
</script>

<template>
  <Button ref="buttonRef">Test Button regular</Button>
  <Button plain>Plain</Button>
  <Button round>Round</Button>
  <Button circle>ZzzZZ</Button>
  <Button disabled>disabled</Button>
  <tr></tr>
  <Button type="primary">Primary</Button>
  <Button type="danger">danger</Button>
  <Button type="info">info</Button>
  <Button type="warning">warning</Button>
  <Button type="success">success</Button>
  <tr></tr>
  <Button type="primary" is-plain>Primary</Button>
  <Button type="danger" is-plain>danger</Button>
  <Button type="info" is-plain>info</Button>
  <Button type="warning" is-plain>warning</Button>
  <Button type="success" is-plain>success</Button>
  <tr></tr>
  <Button size="large">large</Button>
  <Button size="small">small</Button>
</template>

<style scoped></style>
