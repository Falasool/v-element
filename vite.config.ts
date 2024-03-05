import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
// eslint()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin(), vueJsxPlugin()],
})
