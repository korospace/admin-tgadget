import Vue         from 'vue'
import App         from './App.vue'
import router      from './router'
import VueScrollTo from 'vue-scrollto'
import axios       from 'axios'
import VueAxios    from 'vue-axios'
import Chartkick   from 'vue-chartkick'
import Chart       from 'chart.js'
import Vue2Editor  from "vue2-editor";
import './assets/tailwind.css'

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
});

Vue.use(VueAxios,axios);
Vue.use(Chartkick.use(Chart));
Vue.use(Vue2Editor);

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

new Vue({
  router,
  VueScrollTo,
  render: h => h(App)
}).$mount('#app')
