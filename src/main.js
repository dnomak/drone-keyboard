import Vue from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { hooks } from 'vue-hooks'
import '@/assets/scss/main.scss'

library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(hooks)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
