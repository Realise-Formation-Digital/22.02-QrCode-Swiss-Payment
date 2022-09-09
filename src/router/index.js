import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CsvView from '../views/CsvView.vue';
import FormQrView from "@/views/FormQrView";
import InfoView from '@/views/InfoView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/form-qr',
    name: 'FormQr',
    component: FormQrView
  },
  {
    path: '/csv',
    name: 'CsvView',
    component: CsvView
  },
  {
    path: '/info',
    name: '/Info-View',
    component: InfoView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
