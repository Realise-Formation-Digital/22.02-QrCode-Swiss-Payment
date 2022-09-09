import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMarkdown from 'vue-markdown'

//Papa parse library

Vue.config.productionTip = false

new Vue({
  components: {
    VueMarkdown
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
