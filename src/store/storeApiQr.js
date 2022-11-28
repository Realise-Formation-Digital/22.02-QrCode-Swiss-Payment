import { BASE_URL, API_KEY, CSVLIST_OPTIONS, } from '../libs/consts.js'
import axios from "axios";
// import PdfService from '../services/pdfService.js'

const storeApiQr = {
  namespaced: true,
  state: {
    countriesList: [],
    sendSinglePayment: null,
    twoCheckDigit: null
  },
  getters: {
    getCountriesList: (state) => state.countriesList,
    getSendSinglePayment: (state) => state.sendSinglePayment,
    getTwoCheckDigit: (state) => state.twoCheckDigit
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
    async sendSinglePayment(state) {
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
        return response
      } catch (e) {
        console.error('[Service][CsvService][sendJsonList] An error has occurred when sending the list to the api', e)
        throw new Error(e)
      }
    },
    async twoCheckDigit(state) {
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
        state.commit('twoCheckDigit', { referenceNumber: response.data })
      } catch (e) {
        console.error("[Service][ApiService][getTwoCheckDigit] An error occurred when getting two check digit", e)
        throw new Error(e)
      }
    },
    // async mergeFiles(divaltoFile, qrCodeCreateByApi) {
    //   try {
    //     console.log("[Service][ApiService][mergeFiles] Send Divalto pdf files + QR pdf with params (state = divaltoFile, qrCodeCreateByApi)", divaltoFile, qrCodeCreateByApi)

    //     const formData = new FormData()
    //     const pdfLength = await PdfService.CallPdfLengthLib(divaltoFile)

    //     formData.append('file', divaltoFile)
    //     formData.append('file2', qrCodeCreateByApi)

    //     const response = await axios.post(BASE_URL + "/v2/pdf/merge" + API_KEY + "&onPage=" + pdfLength, formData,
    //       {
    //         responseType: "blob",
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           'accept': 'application/pdf'
    //         }
    //       })
    //     if (response.status !== 200) throw Error('API merge Error')
    //     state.commit('bhhouuuhouuu', { response: response.data })
    //   } catch (e) {
    //     console.error("[Service][ApiService][mergeFiles] Echec de retour du pdf mergé (erreur 4xx)")
    //     throw new Error(e)
    //   }
    // }
  }
}

export default storeApiQr