import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

library.add(fas);

createApp(App)
  .use(store)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .mount('#app')

import "bootstrap/dist/js/bootstrap.js"
