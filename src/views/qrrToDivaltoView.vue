<template>
  <v-row>
    <v-col>

      <v-file-input accept="xml/*"
        label="Cliquez ici pour importer le Fichier de confirmation de paiement pour conversion compatible avec Divalto (fichier .xml)"
        @change="fixXMLDivalto">
      </v-file-input>

      <v-btn color="blue" outlined x-large rounded elevation="10" @click="sendCsvList()">cliquez ici pour convertir
      </v-btn>

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
  </v-row>
</template>

<script>
import XmlService from "@/services/xmlService";
// Params used for amount.replace
const regex = /,/gm;
const subst = `.`;

export default {
  name: "xml-View",
  data: () => ({
    // paylLa méthode getElementsByTagNameoad: {},
    loading: true,
    payloadArray: null,
    dialogSendApi: false,
    snackbarError: false,
    textE: "Echec de réception du code QR.",
    snackbarSuccess: false,
    textS: "Réception du code QR confirmée.",
  }),

  watch: {
    /**
     *
     * Function that check value and return the loading pop-up
     *
     * @author Xavier de Juan
     * @params {boolean}
     * @return boolean
     */
    dialogSendApi(val) {
      if (!val) return
    },
  },

  methods: {
    /**
     *
     * Function that check value and return the loading pop-up
     *
     * @author Xavier de Juan
     * @params {object[]????} - convert
     * @return promise<object>
     */
    async fixXMLDivalto(rawFile) {
      try{
        console.log('[Component][fixXMLDivalto] Fixing xml divalto with params', rawFile)
        const response = await XmlService.fixXMLDivalto(rawFile)

        const fileURL = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(response)], {
          type: "text/plain",
        }));

        const link = document.createElement('a');
        let date = new Date();
        let dateActuelle = date.getDate() + "_" + (date.getMonth() + 1) + "_" + (date.getFullYear());
        link.href = fileURL;
        link.download = "XMLDIVALTO" + "_" + dateActuelle + ".xml";
        link.click();

      }catch (e) {
        console.error('[Component][fixXMLDivalto] Fixing xml divalto with params', e)
        // todo handle error
      }
      //console.log('converted', xmlDoc)
      //console.log("convert?", convert)
      //XmlLibrary.setPrTry(xmlDoc)
      //XmlLibrary.rmvTag(xmlDoc)
      //XmlLibrary.rplcTag(xmlDoc)
    },
    amountReplace(MONTANT) {
      return MONTANT ? parseFloat(MONTANT.replace(regex, subst)) : 0
    },
    /**
     *
     * Function that show the snackbar when QR code is not received
     *
     * @author Xavier de Juan
     *
     * @return boolean
     */
    showSnackbarError() {
      this.snackbarError = true
    },
    /**
     *
     * Function that hide the snackbar
     *
     * @author Xavier de Juan
     *
     * @return boolean
     */
    hideSnackBarError() {
      this.snackbarError = false
    },
    /**
     *
     * Function that show the snackbar when QR code is received
     *
     * @author Xavier de Juan
     *
     * @return boolean
     */
    showSnackbarSuccess() {
      this.snackbarSuccess = true
    },
    /**
     *
     * Function that hide the snackbar
     *
     * @author Xavier de Juan
     *
     * @return boolean
     */
    hideSnackbarSuccess() {
      this.snackbarSuccess = false
    }
  },
}
</script>