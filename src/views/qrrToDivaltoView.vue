<template>
  <v-row>
    <v-col cols="3"></v-col>
    <v-col>
      <div class="text-center">
        Importer le fichier pour Divalto transmis par la Poste (fichier XML)
      </div>

      <v-file-input accept="xml/*"
        label="Fichier XML Divalto"
        @change="saveFile">
      </v-file-input>

      <v-card-actions class="justify-center">
        <v-btn  color="blue" :disabled="!rawFile" outlined x-large rounded elevation="10" @click="fixXMLDivalto()">Convertir</v-btn>
      </v-card-actions>

      <!-- Loading pop-up during the API's send -->
      <v-dialog v-model="dialogSendApi" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            En attente de réception
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- error pop-up if the QR code is not received -->
      <v-snackbar v-model="snackbarError" color="red accent-2">
        {{ textE }}
      </v-snackbar>

      <!-- Pop-up when the QR code is received -->
      <v-snackbar v-model="snackbarSuccess" color="success">
        {{ textS }}
      </v-snackbar>
    </v-col>
    <v-col cols="3"></v-col>
  </v-row>
</template>

<script>
import XmlService from "@/services/xmlService";

export default {
  name: "xml-View",
  data: () => ({
    loading: false,
    dialogSendApi: false,
    snackbarError: false,
    textE: "Echec de réception du code QR.",
    snackbarSuccess: false,
    textS: "Réception du code QR confirmée.",
    rawFile: null
  }),

  methods: {

    saveFile(rawFile){
      this.rawFile = rawFile
    },

    /**
     * Function that check value and return the loading pop-up
     *
     * @author Xavier de Juan
     * @params {object[]????} - convert
     * @return promise<object>
     */
    async fixXMLDivalto() {
      try{
        console.log('[Component][fixXMLDivalto] Fixing xml divalto with params', this.rawFile)

        const fileName = this.rawFile.name.slice(0, this.rawFile.name.length - 4)
        const response = await XmlService.fixXMLDivalto(this.rawFile)

        const fileURL = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(response)], {
          type: "text/plain",
        }));

        const link = document.createElement('a');
        link.href = fileURL;
        link.download = fileName + "_CONVERTI" + ".xml";
        link.click();

      }catch (e) {
        console.error('[Component][fixXMLDivalto] Fixing xml divalto with params', e)
        // todo handle error
      }
    },
    /**
     * Function that show the snackbar when QR code is not received
     *
     * @author Xavier de Juan
     * @return boolean
     */
    showSnackbarError() {
      this.snackbarError = true
    },
    /**
     * Function that hide the snackbar
     *
     * @author Xavier de Juan
     * @return boolean
     */
    hideSnackBarError() {
      this.snackbarError = false
    },
    /**
     * Function that show the snackbar when QR code is received
     *
     * @author Xavier de Juan
     * @return boolean
     */
    showSnackbarSuccess() {
      this.snackbarSuccess = true
    },

    /**
     * Function that hide the snackbar
     *
     * @author Xavier de Juan
     * @return boolean
     */
    hideSnackbarSuccess() {
      this.snackbarSuccess = false
    },

    clearComponent() {
      this.rawFile = null
    }
  },
}
</script>