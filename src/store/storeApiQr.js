import { BASE_URL, API_KEY, CSVLIST_OPTIONS, } from '../libs/consts.js';
import axios from "axios";

const storeApiQr = {
  namespaced: true,
  state: {
    countriesList: [],
    sendSinglePayment: null,
    twoCheckDigit: null,
    sendMergedFiles: null,
  },
  getters: {
    getCountriesList: (state) => state.countriesList,
    getSendSinglePayment: (state) => state.sendSinglePayment,
    getTwoCheckDigit: (state) => state.twoCheckDigit,
    getSendMergedFiles: (state) => state.sendMergedFiles
  },
  mutations: {
    /**
     * 
     * @param {*} state 
     * @param {*} payload 
     */
    countriesList(state, payload) {
      state.countriesList = payload.countries
    },
    sendSinglePayment(state, payload) {
      state.sendSinglePayment = payload.response
    },
    twoCheckDigit(state, payload) {
      state.twoCheckDigit = payload.referenceNumber
    },
    sendMergedFiles(state, payload) {
      state.sendMergedFiles = payload.responseMerge
    }
  },
  actions: {
    /**
     * 
     * @param {*} state 
     */
    async countriesList(state) {
      try {
        const response = await axios.get(BASE_URL + '/v2/country' + API_KEY)
        if (response.status !== 200) console.log('error')
        state.commit('countriesList', { countries: response.data })
      } catch (e) {
        console.error(e)
      }
    },
    async sendSinglePayment({ commit }, state) {
      try {
        const response = await axios.post(BASE_URL + '/v2/payment-part-receipt' + API_KEY + '&' + CSVLIST_OPTIONS, state,
          {
            responseType: "blob",
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/pdf',
              'Accept-Language': 'fr'
            }
          },
        )
        if (response.status !== 200) throw Error('API Error')
        commit('sendSinglePayment', { response: response })
        // return response
      } catch (e) {
        console.error('[Service][CsvService][sendJsonList] An error has occurred when sending the list to the api', e)
        throw new Error(e)
      }
    },
    async twoCheckDigit({ commit }, state) {
      try {
        console.log("[Service][ApiService][getTwoCheckDigit] Getting two check digit with params (state = referenceNumber", state)
        const response = await axios.post(BASE_URL + '/v2/creditor-reference/modulo97' + API_KEY, state,
          {
            headers: {
              'Content-Type': 'text/plain',
              'accept': 'text/plain'
            }
          })
        if (response.status !== 200) throw Error('API Error')
        commit('twoCheckDigit', { referenceNumber: response.data })
      } catch (e) {
        console.error("[Service][ApiService][getTwoCheckDigit] An error occurred when getting two check digit", e)
        throw new Error(e)
      }
    },
    async sendMergedFiles({ commit }, state) {
      try {
        console.log("[Store][storeApiQr][sendMergedFiles] Send Divalto pdf files + QR pdf with params (state = pdfDivaltoLength, divaltoFile, qrCodeCreatedByApi)", state)
        const { pdfLength, divaltoFile, qrCodeCreatedByApi } = state
        const formData = new FormData()
        formData.append('file', divaltoFile)
        formData.append('file2', qrCodeCreatedByApi)
        const responseMerge = await axios.post(BASE_URL + "/v2/pdf/merge" + API_KEY + "&onPage=" + pdfLength, formData,
          {
            responseType: "blob",
            headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/pdf'
            }
          })
        if (responseMerge.status !== 200) throw Error('API merge Error')
        commit('sendMergedFiles', { responseMerge: responseMerge.data })
      } catch (e) {
        console.error("[Store][storeApiQr][sendMergedFiles] Echec de retour du pdf mergé (erreur 4xx)")
        throw new Error(e)
      }
    },
  }
}

export default storeApiQr