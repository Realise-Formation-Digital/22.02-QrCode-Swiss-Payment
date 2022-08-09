<template>
  <v-row>
    <v-col>
      <v-file-input accept="csv/*" label="Fichier Excel" @change="papaparse"></v-file-input>
      <v-btn @click="sendCsvList">Envoi a l'api</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import ApiService from '../services/apiService.js';

export default {
  name: "csvView",
  data: () => ({
    payload: {},
    loading: true,
  }),
  methods: {

        // Json the csv file
    papaparse(convert) {
      this.$papa.parse(convert, {
        header: true,
        download: true,
        complete: function (result) {
          // crée un tableau vide qui contiendra le payload
          const mapping = []
          result.data.map((item) => {
            mapping.push({
              // adapte le payload Réalise avec le payload de l'API
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
          console.log('mapping', mapping)         
        },
      })
    },

    async sendCsvList() {
      try {
        console.log('[Views][CsvView][sendCsvList] Called sendCsvList with params',)

        //todo use papaparse to convert from csv to json
        //todo send to the service the json produced
        const response = await ApiService.sendJsonList();

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
  },
}
</script>