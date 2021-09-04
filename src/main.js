import Vue from 'vue'
import App from './App.vue'
import router from './router'
// tailwind
import './assets/tailwind.css'
// vue scrollto
import VueScrollTo from 'vue-scrollto'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// chart.js
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

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

Vue.use(Chartkick.use(Chart))

new Vue({
  router,
  VueScrollTo,
  render: h => h(App)
}).$mount('#app')
