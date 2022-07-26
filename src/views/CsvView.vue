<template>
  <div>
    CSV
    <v-file-input accept="csv/*" label="Fichier Excel" @change="papaparse"></v-file-input>

    <!-- <div v-for="item in payload" :key="item.REF">
    {{ item.REF}}
    </div> -->
    <v-btn @click="sendCsvList"></v-btn>
  </div>
</template>

<script>
import CsvService from '../services/csvService.js';

export default {
  name: "csvView",
  data: () => ({
    datarray: [],
    payload: { //CSV de Réalise 
    },
    loading: false,
  }),
  methods: {

    async sendCsvList() {
      try {
        console.log('[Views][CsvView][sendCsvList] Called sendCsvList with params',)

        //todo use papaparse to convert from csv to json
        //todo send to the service the json produced
        const response = await CsvService.sendJsonList();

        // set the blog type to final pdf
        const file = new Blob([response.data], { type: 'application/pdf' });

        // process to auto download it
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = "FileName" + new Date().getTime() + ".pdf";
        link.click();

      } catch (e) {
        console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
        //todo handle the error
      }
    },

    papaparse(convert) {
      this.$papa.parse(convert, {
        header: true,
        download: true,
        complete: function (result) {

          const payload = []
          result.data.map((item) => {
            payload.push({

              /**
               * Essai import csv payload (map)
               */
              reference: item.REF,   
              amount: parseFloat(item.MONTANT),         
              name: item.NOM,
              streetName: item.ADRESSE,
              houseNumber: item.NUMERO,
              postalCode: item.CODEPOSTAL,
              city: item.VILLE,
              addressLine1: item.ADRESSEPR,
              addressLine2: item.ADRESSESEC,
             
            })
          });
          this.datarray = payload;
          console.log('payload_final', this.datarray)
        },
      })
    },
  }
}
</script>