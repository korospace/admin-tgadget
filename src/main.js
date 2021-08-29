import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import VueScrollTo from 'vue-scrollto'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueScrollTo, {
  container: "#app",
  duration: 800,
  easing: "linear",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(VueAxios,axios);

new Vue({
  router,
  VueScrollTo,
  render: h => h(App)
}).$mount('#app')
