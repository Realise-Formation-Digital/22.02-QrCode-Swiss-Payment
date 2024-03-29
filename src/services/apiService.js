import axios from "axios";
import { BASE_URL, API_KEY, CSVLIST_OPTIONS, MARKDWN_URL } from "@/libs/consts";
import MarkParse from "../libs/marked.js";
import PdfService from "./pdfService.js";

/**
 * @class
 * @classdesc - Service for csv page
 * @author Marco Tribuzio
 */
class ApiService {

    /**
     * Checking if the iban is correct
     * @async
     * @param {string} iban - iban to check
     * @returns {Promise<boolean>}
     */
    static async checkIban(iban) {
        try {
            console.log('[Service][ApiService][checkIban] Checking iban with params', iban)
            const response = await axios.get(BASE_URL + '/v2/iban/validate' + API_KEY, iban)
            if (response.status !== 200) throw Error('API Error')
            return response
        } catch (e) {
            console.error('[Service][ApiService][checkIban] An error has occurred when checking the iban', e)
            throw new Error(e)
        }
    }

    /**
     * Get the list of the countries
     * @async
     * @returns {Promise<Object[{
     *     "code": "string",
     *     "english": "string",
     *     "german": "string",
     *     "french": "string",
     *     "italian": "string",
     * 
     * }]>}
     * @author Marco Tribuzio
     */
    static async getListCountries() {
        try {
            console.log('[Service][ApiService][getListCountries] Getting the list of countries')
            const response = await axios.get(BASE_URL + '/v2/country' + API_KEY)
            if (response.status !== 200) throw Error('API Error')
            return response.data
        } catch (e) {
            console.error('[Service][ApiService][getListCountries] An error occurred when getting the countries list', e)
            throw new Error(e)
        }
    }



    /**
     * Service to send the list to the api, and receive the pdf list to download
     * @async
     * @param {object[]} csvList - the list that we want to send
     * @return Promise<Object>
     * @author Marco Tribuzio
     * @author Xavier de Juan
     */
    static async sendJsonList(csvList) {
        try {
            const data = {
                "creditorInformation": {
                    "iban": "CH4431999123000889012",
                    "creditor": {
                        "addressType": "STRUCTURED",
                        "name": "Robert Schneider AG",
                        "streetName": "Rue du Lac",
                        "houseNumber": "1268",
                        "postalCode": "2501",
                        "city": "Biel",
                        "country": "CH"
                    }
                },
                "paymentAmountInformation": {
                    "amount": 1949.75,
                    "currency": "CHF"
                },
                "ultimateDebtor": {
                    "addressType": "STRUCTURED",
                    "name": "Pia-Maria Rutschmann-Schnyder",
                    "streetName": "Grosse Marktgasse",
                    "houseNumber": "28",
                    "postalCode": "9400",
                    "city": "Rorschach",
                    "country": "CH"
                },
                "paymentReference": {
                    "referenceType": "ISR", //LEAVE AS IT IS
                    "reference": "210000000003139471430009017",
                    "additionalInformation": {
                        "unstructuredMessage": "Instruction of 03.04.2019",
                        "billInformation": "//S1/10/10201409/11/190512/20/1400.000-53/30/106017086/31/180508/32/7.7/40/2:10;0:30"
                    }
                },
                "alternativeSchemes": {
                    "alternativeSchemeParameters": [
                        "Name AV1: UV;UltraPay005;12345",
                        "Name AV2: XY;XYService;54321"
                    ]
                }
            }
            console.log('[Service][ApiService][sendCsvList] Called sendCsvList with params', csvList)
            console.log(BASE_URL + '/v2/payment-part-receipt' + API_KEY + '&' + CSVLIST_OPTIONS)
            const response = await axios.post(BASE_URL + '/v2/payment-part-receipt' + API_KEY + '&' + CSVLIST_OPTIONS, data,
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
            console.error('[Service][ApiService][sendCsvList] An error has occurred when sending the list to the api', e)
            throw new Error(e)
        }
    }

    /**
     * Sending Single Payment to the api
     * @param payload
     * @returns {Promise<*>}
     * @author Marco Tribuzio
     */
    static async sendSinglePayment(payload) {
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
            return response
        } catch (e) {
            console.error('[Service][CsvService][sendJsonList] An error has occurred when sending the list to the api', e)
            throw new Error(e)
        }
    }
    /**
     * Function that makes a request to the markdown library
     * @returns promise
     * @author Xavier de Juan
     */
    static async axioRequ() {
        try {
            console.log("[service][apiService][axioRequ] Request Mark axios")
            const getAxioRequ = await axios.get(MARKDWN_URL)
            console.log("getAxioRequ", getAxioRequ)
            return MarkParse.txtParse(getAxioRequ.data);
        } catch (e) {
            console.error("Request Mark axios error")
            throw new Error(e)
        }
    }

    /**
     * Get Two check digit
     * @param {String} referenceNumber - 27 digit reference number
     * @returns {Promise<String>}
     * @author Marco Tribuzio
     */
    static async getTwoCheckDigit(referenceNumber) {
        try {
            console.log("[Service][ApiService][getTwoCheckDigit] Getting two check digit with params", referenceNumber)
            const response = await axios.post(BASE_URL + '/v2/creditor-reference/modulo97' + API_KEY, referenceNumber,
                {
                    headers: {
                        'Content-Type': 'text/plain',
                        'accept': 'text/plain'
                    }
                })
            if (response.status !== 200) throw Error('API Error')
            return response.data
        } catch (e) {
            console.error("[Service][ApiService][getTwoCheckDigit] An error occurred when getting two check digit", e)
            throw new Error(e)
        }
    }


    /**
     * Send to API for merge
     * @param {object} divaltoFile - 
     * @param {object} qrCodeCreateByApi
     * @author Marco Tribuzio
     * @author Xavier de Juan
     */
    static async mergeFiles(divaltoFile, qrCodeCreateByApi) {
        try {
            console.log("[Service][ApiService][mergeFiles] Send Divalto pdf files + QR pdf with params", divaltoFile, qrCodeCreateByApi)

            const formData = new FormData()
            const pdfLength = await PdfService.CallPdfLengthLib(divaltoFile)

            formData.append('file', divaltoFile)
            formData.append('file2', qrCodeCreateByApi)

            const response = await axios.post(BASE_URL + "/v2/pdf/merge" + API_KEY + "&onPage=" + pdfLength , formData,
                {
                    responseType: "blob",
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accept': 'application/pdf'
                    }
                })
            if (response.status !== 200) throw Error('API merge Error')
            return response.data
        } catch (e) {
            console.error("[Service][ApiService][mergeFiles] Echec de retour du pdf mergé (erreur 4xx)")
            throw new Error(e)
        }
    }
}

export default ApiService