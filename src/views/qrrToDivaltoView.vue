<template>
  <v-row>
    <v-col cols="3"></v-col>
    <v-col>
      <v-sheet elevation="3" outlined :color="cardStateColor ? 'black' : 'red'" rounded>
        <v-card @drop.prevent="onDrop($event)" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
          :class="{ 'grey lighten-2': dragover }">
          <v-card-text>
            <p :class="cardStateColor ? 'black--text' : 'red--text'">{{ dropTakeName }}</p>
            <v-row class="d-flex flex-column" dense align="center" justify="center">
              <v-icon class="mt-5" size="60" :color="isXML ? 'green' : 'grey'">{{ isXML ?
                  'mdi-cloud-check' : 'mdi-cloud-upload'
              }}</v-icon>
              <p :class="cardStateColor ? 'black--text' : 'red--text'">
                {{ isXML ? 'Importation réussie' : 'Glissez-déposez le fichier transmis par la poste à importer. (fichier XML)' }}
              </p>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-sheet>
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col align="center">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" color="primary"
              :disabled="!rawFile" outlined large @click="fixXMLDivalto()">Convertir</v-btn>
          </template>
        </v-hover>
        </v-col>
        <v-col align="center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-btn :class="`elevation-${ hover ? 5 : 3}`" class="transition-swing" color="error" outlined large
                @click="clearComponent()">
                Annuler
              </v-btn>
            </template>
          </v-hover>
        </v-col>
      </v-row>
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
    dragover: false, // Reaction to the passage of the file above the drag & drop
    dropTakeName: null, // Variable that retrieves the file name or the error message in case of no pdf
    cardStateColor: true, // Black or red color of the edge of the frame and the text of the drag & drop
    isXML: false, // To check if it is an xml file
    loading: false,
    snackbarError: false,
    textE: "Echec de réception du code QR.",
    snackbarSuccess: false,
    textS: "Réception du code QR confirmée.",
    rawFile: null
  }),
  methods: {
    /**
     * Drag and drop function
     * @params - event
     * @return - void
     * @author Xavier de Juan
     */
    async onDrop(e) {
      try {
        this.rawFile = null
        this.dragover = false
        this.dropTakeName = e.dataTransfer.files[0].name
        this.isXML = e.dataTransfer.files[0].type === "text/xml"
        if (this.isXML) {
          this.rawFile = e.dataTransfer.files[0]
          this.cardStateColor = true
        } else if (!this.isXML) {
          this.cardStateColor = false
          this.dropTakeName = "L'importation du fichier a échoué. Le format du fichier doit être un .xml"
        }
      } catch (e) {
        console.error(e) //todo handle error
      }
    },
    saveFile(rawFile) {
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
      try {
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
        this.clearComponent()
      } catch (e) {
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
      this.rawFile = null,
        this.dropTakeName = null
      this.isXML = false
      this.cardStateColor = true
    }
  },
}
</script>