import Vue from 'vue'
import Vuex from 'vuex'
import storeApiQr from './storeApiQr.js'
import storeMarkDown from './storeMarkDown.js'
import storePdf from './storePdf.js'
import storeXml from './storeXml.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        storeApiQr,
        storeMarkDown,
        storePdf,
        storeXml
    }
})