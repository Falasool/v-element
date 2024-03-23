import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// fas是一个图标集
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'

// 把faUserSecret单个图标添加到图标库中去
library.add(fas)
import './styles/index.css'

createApp(App).mount('#app')
