import { BASE_URL, API_KEY, CSVLIST_OPTIONS, STORE_ACTIONS_INT, STOREMUTATIONS, } from '../libs/consts.js';
import axios from "axios";

const storeApiQr = {
  namespaced: true,
  state: {
    countriesList: [],
    apiPayload: null,
    sendSinglePayment: null,
    blobQrPdf: null,
    twoCheckDigit: null,
    sendMergedFiles: null
  },
  getters: {
    getCountriesList: (state) => state.countriesList,
    getApiPayload: (state) => state.apiPayload,
    getSendSinglePayment: (state) => state.sendSinglePayment,
    getBlobQrPdf: (state) => state.blobQrPdf,
    getTwoCheckDigit: (state) => state.twoCheckDigit, // Deprecated
    getSendMergedFiles: (state) => state.sendMergedFiles
  },
  mutations: {
    countriesList(state, payload) {
      state.countriesList = payload.countries
    },
    apiPayload(state, payload) {
      state.apiPayload = payload.payloadToApi
    },
    sendSinglePayment(state, payload) {
      state.sendSinglePayment = payload.response
    },
    blobQrPdf(state, payload) {
      state.blobQrPdf = payload.qrFileBlob
    },
    /**
     * Deprecated
     * @param {*} state 
     * @param {*} payload 
     */
    twoCheckDigit(state, payload) {
      state.twoCheckDigit = payload.referenceNumber
    },
    sendMergedFiles(state, payload) {
      state.sendMergedFiles = payload
    }
  },
  actions: {
    /**
     * Function that get the countries list
     * @param {*} state 
     * @returns {promise}
     * @author - Xavier de Juan
     */
    async countriesList(state) {
      try {
        const response = await axios.get(BASE_URL + '/v2/country' + API_KEY)
        if (response.status !== 200) console.log('error')
        state.commit(STOREMUTATIONS.COUNTRIESLIST, { countries: response.data })

      } catch (e) {
        console.error(e)
      }
    },
    /**
     * Function that take the form for the payload and it to the singlePayement function
     * @param {*} param0 
     * @param {*} payload
     * @returns {void}
     * @author - Xavier de Juan
     */
    async apiPayload({ dispatch, commit }, payload) {
      try {
        console.log('[store][storeApiQr][apiPayload] Take the list for the payload', payload)
        // const formPayload = rootGetters['storePdf/getUnlockPdf']
        const { formToApi } = payload
        // const { formToApi } = formPayload
        const regex = /,/gm;
        const subst = `.`;

        const payloadAPI = {
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
            "amount": parseFloat(formToApi.amount.replace(regex, subst)),

            "currency": process.env.VUE_APP_CREDITOR_INFORMATION_CURRENCY
          },
          "ultimateDebtor": {
            "addressType": "STRUCTURED",
            "name": formToApi.dnom,
            "streetName": formToApi.dstreet,
            "houseNumber": formToApi.dnr,
            "postalCode": formToApi.dnpa,
            "city": formToApi.dplace,
            "country": formToApi.dcountry
          },
          "paymentReference": {
            "referenceType": process.env.VUE_APP_CREDITOR_INFORMATION_REFERENCETYPE,
            "reference": formToApi.nrref,
            "additionalInformation": {
              "unstructuredMessage": formToApi.infosupp
            }
          },
        }
        await dispatch(STORE_ACTIONS_INT.SENDSINGLEPAYMENT, payloadAPI)
        commit(STOREMUTATIONS.APIPAYLOAD, { payloadToApi: payloadAPI })
      } catch (e) {
        console.error('[store][storeApiQr][apiPayload] Failed while taking the list for the payload', e)
        throw new Error
      }
    },
    /**
     * Function that send, receive the form to the API and send it to the blobQrPdf function
     * @param {*} param0 
     * @param {*} payload 
     * @returns {blob - promise}
     * @author - Xavier de Juan
     */
    async sendSinglePayment({ dispatch }, payload) {
      try {
        const response = await axios.post(BASE_URL + '/v2/payment-part-receipt' + API_KEY + '&' + CSVLIST_OPTIONS, payload,
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
        await dispatch(STORE_ACTIONS_INT.BLOBQRPDF, response.data)
      } catch (e) {
        console.error('[Service][CsvService][sendJsonList] An error has occurred when sending the list to the api', e)
        throw new Error(e)
      }
    },
    /**
     * Function that change the object in blob object
     * @param {*} param0 
     * @param {*} payload 
     * @returns {blob}
     * @author - Xavier de Juan
     */
    async blobQrPdf({ dispatch }, payload) {
      try {
        console.log('[store][storeApiQr][blobQrPdf] Convert the Qr pdf to blob', payload)
        const qrFileBlob = new Blob([payload], { type: 'application/pdf' });
        await dispatch(STORE_ACTIONS_INT.SENDMERGEDFILES, qrFileBlob)
      } catch (e) {
        console.error('[store][storeApiQr][blobQrPdf] Failed to convert the Qr pdf to blob', e)
        throw new Error
      }
    },
    /**
     * Deprecated
     * @param {*} param0 
     * @param {*} payload 
     */
    async twoCheckDigit({ commit }, payload) {
      try {
        console.log("[Service][ApiService][getTwoCheckDigit] Getting two check digit with params (payload = referenceNumber", payload)
        const response = await axios.post(BASE_URL + '/v2/creditor-reference/modulo97' + API_KEY, payload,
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
    /**
     * Function that get from blobDivaltoPdf mutation and deconstruct the object to send to the API
     * @param {*} param0 
     * @param {*} payload 
     * @returns {blob - promise}
     * @author - Xavier de Juan
     */
    async sendMergedFiles({ commit, rootGetters }, payload) {
      console.log("[Store][storeApiQr][sendMergedFiles] Send Divalto pdf files + QR pdf with params (payload = pdfDivaltoLength, divaltoFile, qrCodeCreatedByApi)", payload)
      try {
        const pdfLength = rootGetters["storePdf/getCallPdfLengthLib"]
        const blob1 = rootGetters["storePdf/getBlobDivaltoPdf"]
        const formData = new FormData()
        formData.append('file', blob1)
        formData.append('file2', payload)
        const responseMerge = await axios.post(BASE_URL + "/v2/pdf/merge" + API_KEY + "&onPage=" + pdfLength, formData,
          {
            responseType: "blob",
            headers: {
              'Content-Type': 'multipart/form-data',
              'accept': 'application/pdf'
            }
          })
        if (responseMerge.status !== 200) throw Error('API merge Error')
        commit(STOREMUTATIONS.SENDMERGEDFILES, responseMerge.data)
      } catch (e) {
        console.error("[Store][storeApiQr][sendMergedFiles] Echec de retour du pdf mergé (erreur 4xx)")
        throw new Error(e)
      }
    },
  }
}

export default storeApiQr