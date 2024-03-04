<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import useURLLoader from './hooks/useURLLoader'
interface DogResult {
  message: string
  status: string
}
interface TodoResult {
  title: string
}
//jsonplaceholder.typicode.com/todos/1
const { result, loading } = useURLLoader<DogResult>(
  'https://dog.ceo/api/breeds/image/random'
)
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <h2 v-if="loading">Loading...</h2>
  <!-- 
    if: loading 已经结束 && result 存在（拿到api返回结果）
   -->
  <img v-if="!loading && result" :src="result.message" alt="" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
