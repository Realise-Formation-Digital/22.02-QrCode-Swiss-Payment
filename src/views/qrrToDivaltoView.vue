<template>
  <v-row>
    <v-col cols="3"></v-col>
    <v-col>
      <v-sheet elevation="3" outlined :color="dragNDropXmlErrorColor ? 'red' : 'black'" rounded>
        <v-card @drop.prevent="onDrop($event)" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
          :class="{ 'grey lighten-2': dragover }">
          <v-card-text>
            <p :class="dragNDropXmlErrorColor ? 'red--text' : 'black--text'">{{ dropTakeName }}</p>
            <v-row class="d-flex flex-column" dense align="center" justify="center">
              <v-icon class="mt-5" size="60" :color="isXML ? 'green' : 'grey'">{{ isXML ?
                  'mdi-cloud-check' : 'mdi-cloud-upload'
              }}</v-icon>
              <p :class="dragNDropXmlErrorColor ? 'red--text' : 'black--text'">
                {{ isXML ? 'Importation réussie' :
                    'Glissez-déposez le fichier transmis par la poste à importer. (fichier XML)'
                }}
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
              <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" color="success" outlined large
                @click="validFileXml()">Convertir</v-btn>
            </template>
          </v-hover>
        </v-col>
        <v-col align="center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" color="error" outlined large
                @click="clearComponent()">
                Annuler
              </v-btn>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
    <SnackBar ref="snackbar" />
    <v-col cols="3"></v-col>
  </v-row>
</template>
<script>
import XmlService from "@/services/xmlService";
import SnackBar from '../components/SnackBar.vue';
import { SUCCESSCODE } from "@/libs/consts.js";
import { ERRORCODE } from "@/libs/consts.js";
export default {
  name: "xml-View",
  components: { SnackBar },
  data: () => ({
    dragover: false, // Boolean reaction to the passage of the file above the drag & drop
    dropTakeName: "", // Variable that retrieves the file name or the error message in case of no pdf
    dragNDropXmlErrorColor: false, // Black or red color of the edge of the frame and the text of the drag & drop
    isXML: false, // To check if it is an xml file
    loading: false,
    snackbar: { // API merge file receipt status message
      flag: false,
      text: "",
      color: ""
    },
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
        this.rawFile = null// Doit être en null pour fonctionner correctement
        this.dragover = false
        this.dropTakeName = e.dataTransfer.files[0].name
        this.isXML = e.dataTransfer.files[0].type === "text/xml"
        if (this.isXML) {
          this.rawFile = e.dataTransfer.files[0]
          this.dragNDropXmlErrorColor = false
        } else if (!this.isXML) {
          this.dragNDropXmlErrorColor = true
          this.dropTakeName = "L'importation du fichier a échoué. Le format du fichier doit être un .xml"
        }
      } catch (e) {
        console.error(e) //todo handle error
      }
    },
    validFileXml() {
      if (this.rawFile) {
        this.dragNDropXmlErrorColor = false
        this.fixXMLDivalto()
      } else {
        this.dragNDropXmlErrorColor = true
      }
    },
    saveFile(rawFile) {
      if (this.rawFile) {
        this.dragNDropXmlErrorColor = false
      } else {
        this.dragNDropXmlErrorColor = true
      }
      this.rawFile = rawFile
    },
    /**
     * Function that check value and return the loading pop-up
     * @params {promise} - convert
     * @return promise<object>
     * @author Xavier de Juan
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
        this.$refs.snackbar.handleSuccess(SUCCESSCODE.XMLCONVERTED)
      } catch (e) {
        console.error('[Component][fixXMLDivalto] Fixing xml divalto with params', e)
        this.$refs.snackbar.handleError(ERRORCODE.ERRORCONVERT)
        // todo handle error
      }
    },
    /**
     * Reset the drag n drop zone
     */
    clearComponent() {
      this.rawFile = null
      this.dropTakeName = ""
      this.isXML = false
      this.dragNDropXmlErrorColor = false
    }
  },
}
</script>