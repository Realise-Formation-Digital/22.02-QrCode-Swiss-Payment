<template>
  <div>
    CSV
    <v-file-input accept="csv/*" label="Fichier Excel" @change="papaparse()"></v-file-input>
  </div>
</template>

<script>
import CsvService from '../services/csvService.js';

export default {
  name: "csv-view",
  data: () => ({
    payload: {
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
    },
    loading: false,
  }),
  methods: {

     async sendCsvList(){
        try{
            console.log('[Views][CsvView][sendCsvList] Called sendCsvList with params', )
            
            //todo use papaparse to convert from csv to json
            //todo send to the service the json produced
            const response = await CsvService.sendJsonList();

            // set the blog type to final pdf
            const file = new Blob([response.data], {type: 'application/pdf'});

            // process to auto download it
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "FileName" + new Date().getTime() + ".pdf";
            link.click();

        }catch(e){
            console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
            //todo handle the error
        }
    }
  },
  papaparse(convert) {
    this.$papa.parse(convert, {
      header: true,
      download: true,
      complete: function (result) {
        this.datas = result;
        console.log(this.datas);
      }
    })
  },
}
</script>