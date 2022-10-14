import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Traductor from "@/libs/i18n";

//Papa parse library

Vue.config.productionTip = false

Traductor.initTraductor()
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')