import axios from "axios";
import { BASE_URL, API_KEY, CSVLIST_OPTIONS } from "@/libs/consts";

/**
 * @class
 * @classdesc - Service for csv page
 */
class ApiService {

    /**
     * Service to send the list to the api, and receive the pdf list to download
     * @async
     * @param {object[]} csvList - the list that we want to send
     * @return Promise<Object>
     */
    static async sendJsonList(csvList) {
        try {
            console.log('[Service][apiService][sendJsonList] Called sendCsvList with params', csvList)

            const payload = csvList.map((ligneCSV) => {
                console.log("Ligne CSV", ligneCSV)
                return {
                    "creditorInformation": {
                        "iban": "CH",
                        "creditor": {
                            "addressType": "STRUCTURED",
                            "name": "Réalise S.A.",
                            "streetName": "Rue Viguet",
                            "houseNumber": "8",
                            "postalCode": "1227",
                            "city": "Genève",
                            "addressLine1": "Rue Viguet 8 1227 les Acacias",
                            "addressLine2": "1227 Les acacias genève",
                            "country": "CH"
                        }
                    },
                    "ultimateCreditor": {
                        "addressType": "STRUCTURED",
                        "name": "Réalise Genève",
                        "streetName": "Rue Viguet",
                        "houseNumber": "8",
                        "postalCode": "1227",
                        "city": "Genève",
                        "addressLine1": "Rue Viguet 8 1227 les Acacias",
                        "addressLine2": "1227 Les acacias genève",
                        "country": "CH"
                    },
                    "paymentAmountInformation": {
                        "amount": parseFloat(ligneCSV.amount),
                        "currency": "CHF"
                    },
                    "ultimateDebtor": {
                        "addressType": "STRUCTURED",
                        "name":ligneCSV.name,
                        "streetName": ligneCSV.streetName,
                        "houseNumber": ligneCSV.houseNumber,
                        "postalCode": ligneCSV.postalCode,
                        "city": ligneCSV.city,
                        "addressLine1": ligneCSV.addressLine1,
                        "addressLine2": ligneCSV.addressLine2,
                        "country": "CH"
                    },
                    "paymentReference": {
                        "referenceType": "SCOR",
                        "reference": ligneCSV.reference,
                        "additionalInformation": {
                            "unstructuredMessage": "Bill No. 3139 for garden work and disposal of cuttings",
                            "billInformation": "//S1/10/10201409/11/190512/20/1400.000-53/30/106017086/31/180508/32/7.7/40/2:10;0:30",
                            "billInformationObject": {}
                        }
                    },
                    "alternativeSchemes": {
                        "alternativeSchemeParameters": [
                            "Name AV1: UV;UltraPay005;12345"
                        ]
                    },
                }
            })
            console.log("payload", payload)           
            console.log(BASE_URL + '/v2/payment-part-receipt' + API_KEY + '&' + CSVLIST_OPTIONS)
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
            return response
        } catch (e) {
            console.error('[Service][CsvService][sendJsonList] An error has occurred when sending the list to the api', e)
            throw new Error(e)
        }
    }

    /**
     * Sending Single Payment to the api
     * @param payload
     * @returns {Promise<*>}
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
            return response
        }catch (e) {
            console.error('[Service][CsvService][sendSinglePayment] An error has occurred when sending a single payment to the api', e)
            throw new Error(e)
        }
    }
}

export default ApiService