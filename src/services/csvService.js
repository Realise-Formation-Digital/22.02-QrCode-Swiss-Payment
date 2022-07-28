import axios from "axios";
import { BASE_URL, API_KEY, CSVLIST_OPTIONS } from "@/libs/consts";
import { mapping } from "../views/CsvView.vue"
const payload = mapping

/**
 * @class
 * @classdesc - Service for csv page
 */
class CsvService {

    /**
     * Service to send the list to the api, and receive the pdf list to download
     * @async
     * @param {object[]} csvList - the list that we want to send
     * @return Promise<Object>
     */
    static async sendJsonList(csvList) {
        try {
            const data = {
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
                    "amount": "",
                    "currency": "CHF"
                },
                 
                "ultimateDebtor": {
                    "addressType": "STRUCTURED",
                    "name":"",
                    "streetName": "",
                    "houseNumber": "",
                    "postalCode": "",
                    "city": "",
                    "addressLine1": "",
                    "addressLine2": "",
                    "country": "CH"
                },
                "paymentReference": {
                    "referenceType": "SCOR",
                    "reference": "",
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
            console.log("payload", payload)           
            console.log('[Service][CsvService][sendCsvList] Called sendCsvList with params', csvList, data)
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
            return response
        } catch (e) {
            console.error('[Service][CsvService][sendCsvList] An error has occured when sending the list to the api', e)
            throw new Error(e)
            
        }
    }
}

export default CsvService