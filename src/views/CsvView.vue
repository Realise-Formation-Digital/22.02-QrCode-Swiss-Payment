<template>
  <v-row>
    <v-col>
      <v-file-input accept="csv/*" label="Cliquez ici pour importer le Fichier contenant la/les facture(s) (Format Excel)" @change="papaparse"></v-file-input>
      <v-btn color="blue" outlined x-large rounded elevation="10" @click="sendCsvList()">cliquez ici pour convertir la/les facture(s) en code qr</v-btn>

      <v-dialog v-model="dialogSendApi" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            En attente de réception
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbarError" color="red accent-2">
        {{ textE }}
      </v-snackbar>

      <v-snackbar v-model="snackbarSuccess" color="success">
        {{ textS }}
      </v-snackbar>


    </v-col>
  </v-row>
</template>

<script>
import ParseCsv from '@/libs/papaparse';
import ApiService from '../services/apiService.js';

export default {
  name: "csvView",
  data: () => ({
    payload: {},
    loading: true,
    cazzo: null,

    dialogSendApi: false,

    snackbarError: false,
    textE: "Echec de réception du code QR.",
    snackbarSuccess: false,
    textS: "Réception du code QR confirmée.",
  }),

   watch: {
    dialogSendApi(val) {
      if (!val) return
      // setTimeout(() => (this.dialogSendApi = false), 5000)
    },
  },

  methods: {

    // Json the csv file
    async papaparse(convert) {

      let test = await ParseCsv.csvToJson(convert)

      this.cazzo = test.map((item) => {
        return {
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
        }
      });
    },

    showSnackbarError() {
      this.snackbarError = true;
    },
    hideSnackBarError() {
      this.snackbarError = false;
    },
    showSnackbarSuccess() {
      this.snackbarSuccess = true;
    },
    hideSnackbarSuccess() {
      this.snackbarSuccess = false;
    },
   

    async sendCsvList() {
      try {
         this.dialogSendApi = true;
        console.log('[Views][CsvView][sendCsvList] Called sendCsvList with params',)

        //todo use papaparse to convert from csv to json
        //todo send to the service the json produced
        console.log('[Views][CsvView][sendCsvList] Called sendCsvList with params', this.cazzo)
        const response = await ApiService.sendJsonList(this.cazzo);

        // set the blog type to final pdf
        const file = new Blob([response.data], { type: 'application/pdf' });

        // process to auto download it
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = "FileName" + new Date().getTime() + ".pdf";
        link.click();
        this.showSnackbarSuccess();
        this.dialogSendApi = false;

      } catch (e) {
        this.showSnackbarError();
        this.dialogSendApi = false;
        console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
        //todo handle the error
      }
    },
  },
}
</script>