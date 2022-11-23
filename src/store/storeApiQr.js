import { BASE_URL, API_KEY } from '../libs/consts.js'
import axios from "axios";

const storeApiQr = {
  namespaced: true,
  state: {
    countriesList: []
  },
  getters: {
    getCountriesList: (state) => state.countriesList
  },
  mutations: {
    /**
     * 
     * @param {*} state 
     * @param {*} payload 
     */
    countriesList(state, payload) {
      console.log("STATE MUTATION")
      state.countriesList = payload.countries
    }
  },
  actions: {
    /**
     * 
     * @param {*} state 
     */
    async countriesList(state) {
      try {
        console.log("STATE ACRION")
        const response = await axios.get(BASE_URL + '/v2/country' + API_KEY)
        if (response.status !== 200) console.log('error')
        state.commit('countriesList', { countries: response.data })
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default storeApiQr