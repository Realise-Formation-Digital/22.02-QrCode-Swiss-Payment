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
    static async sendJsonList(csvList){
        try{
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
            return response
        }catch(e){
            console.error('[Service][ApiService][sendCsvList] An error has occured when sending the list to the api', e)
            throw new Error(e)
        }
    }
}

export default ApiService