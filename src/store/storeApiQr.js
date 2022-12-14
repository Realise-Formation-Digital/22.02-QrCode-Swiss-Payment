import { BASE_URL, API_KEY, CSVLIST_OPTIONS, } from '../libs/consts.js';
import axios from "axios";

const storeApiQr = {
  namespaced: true,
  state: {
    countriesList: [],
    apiPayload: null,
    sendSinglePayment: null,
    blobQrPdf: null,
    twoCheckDigit: null,
    sendMergedFiles: null,
  },
  getters: {
    getCountriesList: (state) => state.countriesList,
    getApiPayload: (state) => state.apiPayload,
    getSendSinglePayment: (state) => state.sendSinglePayment,
    getBlobQrPdf: (state) => state.blobQrPdf,
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
    apiPayload(state, payload) {
      state.apiPayload = payload.mappingPayload
    },
    sendSinglePayment(state, payload) {
      state.sendSinglePayment = payload.response
    },
    blobQrPdf(state, payload) {
      state.blobQrPdf = payload.qrFileBlob
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
    async apiPayload({ dispatch }) {
      try {
        console.log('[store][storeApiQr][apiPayload] Take the list for the payload')
        const payload = {
          "creditorInformation": {
            "iban": process.env.VUE_APP_CREDITOR_INFORMATION_IBAN,
            "creditor": {
              "addressType": "STRUCTURED",
              "name": process.env.VUE_APP_CREDITOR_INFORMATION_NAME,
              "streetName": process.env.VUE_APP_CREDITOR_INFORMATION_STREETNAME,
              "houseNumber": process.env.VUE_APP_CREDITOR_INFORMATION_HOUSENUMBER,
              "postalCode": process.env.VUE_APP_CREDITOR_INFORMATION_POSTALCODE,
              "city": process.env.VUE_APP_CREDITOR_INFORMATION_CITY,
              "country": process.env.VUE_APP_CREDITOR_INFORMATION_COUNTRY
            }
          },
          "paymentAmountInformation": {
            "amount": parseFloat(this.form.amount.replace(/,/, /./)),
            "currency": process.env.VUE_APP_CREDITOR_INFORMATION_CURRENCY
          },
          "ultimateDebtor": {
            "addressType": "STRUCTURED",
            "name": this.form.dnom,
            "streetName": this.form.dstreet,
            "houseNumber": this.form.dnr,
            "postalCode": this.form.dnpa,
            "city": this.form.dplace,
            "country": this.form.dcountry
          },
          "paymentReference": {
            "referenceType": process.env.VUE_APP_CREDITOR_INFORMATION_REFERENCETYPE,
            "reference": this.form.nrref,
            "additionalInformation": {
              "unstructuredMessage": this.form.infosupp
            }
          },
        }
        await dispatch('sendSinglePayment', { mappingPayload: payload })
      } catch (e) {
        console.error('[store][storeApiQr][apiPayload] Failed while taking the list for the payload', e)
        throw new Error
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
      } catch (e) {
        console.error('[Service][CsvService][sendJsonList] An error has occurred when sending the list to the api', e)
        throw new Error(e)
      }
    },
    async blobQrPdf({ commit }, state) {
      try {
        console.log('[store][storeApiQr][blobQrPdf] Convert the Qr pdf to blob', state)
        const qrFileBlob = new Blob([state.data], { type: 'application/pdf' });
        commit('blobQrPdf', {qrFileBlob: qrFileBlob})
      } catch (e) {
        console.error('[store][storeApiQr][blobQrPdf] Failed to convert the Qr pdf to blob', e)
        throw new Error
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
        const { pdfLength, divaltoFileBlob, qrCodeCreatedByApi } = state
        const formData = new FormData()
        formData.append('file', divaltoFileBlob)
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