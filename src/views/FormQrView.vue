<!-- Form to send to payload to get back a PDF/Qr file -->
<template class="background">
  <v-row class="background">
    <!-- Drag and drop -->
    <v-col lg="4" md="4" sm="12" xs="12" class="sureleve">
      <h1>Facture Divalto</h1>
      <v-sheet elevation="16" outlined :color="cardStateColor ? 'black' : 'red'" rounded>
        <v-card @drop.prevent="onDrop($event)" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
          :class="{ 'grey lighten-2': dragover }">
          <v-card-text>
            <v-btn @click.stop="removeDivaltoFile" icon>
              <v-icon> mdi-close-circle </v-icon>
            </v-btn>
            <p :class="cardStateColor ? 'black--text' : 'red--text'">{{ dropTakeName }}</p>
            <v-row class="d-flex flex-column" dense align="center" justify="center">
              <v-icon class="mt-5" size="60" :color="isAPdf ? 'green' : 'grey'">{{ isAPdf ?
                  'mdi-cloud-check' : 'mdi-cloud-upload'
              }}</v-icon>
              <p :class="cardStateColor ? 'black--text' : 'red--text'">
                {{ isAPdf ? 'Importation réussie' : 'Glissez-déposer ici la facture Divalto à importer (format.pdf)' }}
              </p>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col lg="1" md="1" class="sureleve milieu"></v-col>
    <!-- Form -->
    <v-col lg="7" md="7" sm="12" xs="12">
      <v-form class="formulaire container" ref="form" v-model="valid" lazy-validation>
        <!--Text fields form for the debtors -->
        <h1>{{ this.traduis('formqrcode.debiteur') }}</h1>
        <!-- todo set rules with one in the api -->

        <v-text-field v-model="form.dnom" counter maxlength="70" :rules="formRules.dnom"
          :label="traduis('formqrcode.nom')" required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" dark v-bind="attrs" v-on="on">
                  info
                </v-icon>
              </template>
              <span>Texte traduit automatiquement à integrer</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dstreet" counter maxlength="70" :rules="formRules.dstreet"
          :label="traduis('formqrcode.rue')" required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on">info</v-icon>
              </template>
              <span>Rue/Case postale du débiteur final
                70 caractères au maximum admis.
                Ne peut pas contenir un numéro de maison ou de bâtiment.</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dnr" counter maxlength="16" :rules="formRules.dnr"
          :label="traduis('formqrcode.numDeRue')" append-icon="info" required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on">info</v-icon>
              </template>
              <span>Numéro de maison du débiteur final.
                16 caractères au maximum admis</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dnpa" counter maxlength="16" :rules="formRules.dnpa"
          :label="traduis('formqrcode.codePostal')" required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on">info</v-icon>
              </template>
              <span>Code postal du débiteur final 16 caractères au maximum admis.
                Toujours à indiquer sans code de pays de tête</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dplace" counter maxlength="16" :rules="formRules.dplace"
          :label="traduis('formqrcode.ville')" required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on">info</v-icon>
              </template>
              <span>Lieu du débiteur final.
                16 caractères au maximum admis</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-autocomplete v-model="form.dcountry" :label="traduis('formqrcode.pays')" :rules="formRules.dcountry"
          :items="countriesList" item-text="french" item-value="code">
        </v-autocomplete>

        <h1>{{ this.traduis('formqrcode.infoMontPaiement') }}</h1>
        <v-text-field v-model="form.amount" counter maxlength="12" :rules="formRules.amount"
          :label="traduis('formqrcode.montant')" v-on:keypress="nombreSeulement" required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on">info</v-icon>
              </template>
              <span>Montant du paiement.
                L'élément est à indiquer sans zéros de tête, y compris séparateur décimal, et deux décimales.
                12 positions au maximum admises, y compris séparateur décimal. Seul le point («.») est admis
                comme séparateur décimal.</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.nrref" counter :rules="formRules.nrref" :label="traduis('formqrcode.numRef')"
          required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on">info</v-icon>
              </template>
              <span>Numéro de référence
                Référence de paiement structurée
                Remarque: La référence est soit une référence QR, soit une Creditor Reference (ISO 11649)
                27 caractères alphanumériques au maximum.
                Doit être rempli en cas d'utilisation d'un QR-IBAN.
                Référence QR: 27 caractères numériques, calcul du chiffre de contrôle selon modulo 10 récursif (27e
                position de la référence).
                Creditor Reference (ISO 11649): jusqu'à 25 caractères alphanumériques.
                L'élément ne doit pas être rempli pour le type de référence NON.</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-textarea v-model="form.infobill" counter maxlength="140" :rules="formRules.infobill"
          :label="traduis('formqrcode.infoFacture')">
          <template v-slot:append>
            <v-tooltip top :max-width="maxWidthTooltip">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Les informations structurelles de l'émetteur de factures contiennent des informations codées pour la
                comptabilisation automatisée du paiement. Les données ne sont pas transmises avec le paiement. 140
                caractères au maximum.</span>
            </v-tooltip>
          </template>
        </v-textarea>
        <v-text-field v-model="form.infosupp" counter maxlength="56" :rules="formRules.infosupp"
          :label="traduis('formqrcode.infoSupp')">
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-bind="attrs" v-on="on">info</v-icon>
              </template>
              <span>Les informations instructurées peuvent être utilisées pour l'indication d'un motif de paiement ou
                pour des informations textuelles complémentaires au sujet de paiements avec référence structurée. 56
                caractères au maximum</span>
            </v-tooltip>
          </template>
        </v-text-field>

        <!--Buttons calling functions for the form-->
        <v-btn color="success" class="mr-10 mt-10" outlined x-large rounded elevation="10" @click="showDialog()">{{
            this.traduis('formqrcode.valider')
        }}
        </v-btn>
        <v-btn color="error" class="ml-10 mt-10" outlined x-large rounded elevation="10" @click="reset()">{{
            this.traduis('formqrcode.effacer')
        }}</v-btn>

        <!--Modal to check and confirm the form -->
        <v-dialog v-model="dialog" max-width="70%" persistent>
          <v-card>
            <v-card-title>
              <h1>{{ this.traduis('modale.verifConfirm') }}</h1>
            </v-card-title>

            <!-- Checkform in the modal -->
            <v-card-text>
              <v-row class="container">
                <v-col cols="4" class="modalDialogStyle">
                  <p><strong><em>Facture Divalto</em></strong>: {{ dropTakeName }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.nom') }}</i></b>: {{ form.dnom }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.rue') }}</i></b>: {{ form.dstreet }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.numDeRue') }}</i></b>: {{ form.dnr }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.codePostal') }}</i></b>: {{ form.dnpa }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.ville') }}</i></b>: {{ form.dplace }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.pays') }}</i></b>: {{ form.dcountry }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.montant') }}</i></b>: {{ form.amount }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.numRef') }}</i></b>: {{ form.nrref }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.infoFacture') }}</i></b>: {{ form.infobill }}</p>
                  <p><b><i>{{ this.traduis('formqrcode.infoSupp') }}</i></b>: {{ form.infosupp }}</p>
                </v-col>
                <!-- <v-col cols="6">
                <p>{{  form.dnom  }}</p>
                <p>{{  form.dstreet  }}</p>
                <p>{{  form.dnr  }}</p>
                <p>{{  form.dnpa  }}</p>
                <p>{{  form.dplace  }}</p>
                <p>{{  form.dcountry  }}</p>
                <p>{{  form.amount  }}</p>
                <p>{{  form.nrref  }}</p>
                <p>{{  !!form.infobill ? form.infobill : "N/A"  }}</p>
                <p>{{  !!form.infosupp ? form.infosupp : "N/A"  }}</p>
              </v-col> -->
              </v-row>
            </v-card-text>
            <!-- Confirm or return buttons calling the functions -->
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="success" class="mr-16" x-large rounded elevation="5" :loading="!!countDown"
                :disabled="!!countDown" @click="confirm()">
                {{ this.traduis('modale.confirmer') }}
                <template v-slot:loader>
                  <span>
                    <v-progress-circular :indeterminate="true" :size="40" :value="countDown" :width="5" color="orange">
                      {{ countDown }}
                    </v-progress-circular>
                  </span>
                </template>
              </v-btn>

              <v-btn color="error" class="ml-10" x-large rounded elevation="5" text @click="hideDialog()">
                {{ this.traduis('modale.annuler') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
      <!-- Pop-up when the QR code is received -->
      <v-snackbar v-model="snackbar.flag" :color="snackbar.color" :right="true" :top="true">
        {{ snackbar.text }}
      </v-snackbar>

      <!-- Pop-up until the QR code is received or an error -->
      <v-dialog v-model="loadingPopUp" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Veuillez patienter, en attente de réception
            <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import ApiService from "@/services/apiService.js";
import { traductionMixin } from "@/mixins/traductionMixin.js";
import PdfService from '@/services/pdfService.js';
// import { PDFDocument, rgb } from 'pdf-lib';

// Params used for amount.replace
const regex = /,/gm;
const subst = `.`;

export default {
  name: "FormQr",
  mixins: [traductionMixin],
  data: () => ({
    dragover: false, // Reaction to the passage of the file above the drag & drop
    dropTakeName: null, // Variable that retrieves the file name or the error message in case of no pdf
    cardStateColor: true, // Black or red color of the edge of the frame and the text of the drag & drop
    isAPdf: false, // Check if it is a pdf or not
    divaltoFile: null, // PDF file
    divaltoFileBlob: null, // pdf file converted to Blob
    qrFileBlob: null, // Pdf file received from API
    snackbar: { // API merge file receipt status message
      flag: false,
      text: null,
      color: null,
    },
    // Form
    form: {
      dnom: "",
      dstreet: "",
      dnr: "",
      dnpa: "",
      dplace: "",
      dcountry: "",
      amount: "",
      nrref: "",
      infosupp: "",
      infobill: "",
    },
    formRules: {
      dnom: [
        v => !!v || "Le champ 'Nom' est obligatoire.",
        v => {
          if (v) return v.length <= 70 || "Le nom ne peut excéder 70 caractères.";
          else return true;
        }],
      dstreet: [
        v => !!v || "Le champ 'Rue' est obligatoire.",
        v => {
          if (v) return v.length <= 70 || "La rue ne peut excéder 70 caractères.";
          else return true;
        }],
      dnr: [
        v => !!v || "Le champ 'Numéro de rue' est obligatoire.",
        v => {
          if (v) return v.length <= 16 || "Le n° de rue ne peut excéder 16 caractères.";
          else return true;
        }],
      dnpa: [
        v => !!v || "Le champ 'Code postal' est obligatoire.",
        v => {
          if (v) return v.length <= 16 || "Le code postal ne peut excéder 16 caractères.";
          else return true;
        }],
      dplace: [
        v => !!v || "Le champ 'Ville' est obligatoire.",
        v => {
          if (v) return v.length <= 16 || "La ville ne peut excéder 16 caractères.";
          else return true;
        }],
      dcountry: [
        v => !!v || 'Veuillez selectionner un pays',
      ],
      amount: [
        v => !!v || "Le champ 'Montant' est obligatoire.",
        v => {
          if (v) return v.length <= 12 || "Le montant ne peut excéder 12 caractères.";
          else return true;
        }],
      nrref: [
        v => !!v || "Le champ 'Numéro de référence' est obligatoire.",
        v => {
          if (v) return v.length === 27 || "Doit contenir 27 caractères";
          else return true;
        }],
      infosupp: [
        v => {
          if (v) return v.length <= 56 || 'Les informations supplémentaires ne peuvent excéder 56 caractères';
          else return true;
        }],
      infobill: [
        v => {
          if (v) return v.length <= 140 || 'Les informations supplémentaires ne peuvent excéder 140 caractères';
          else return true;
        }],
    },
    dialog: false,// Boolean modal by default
    valid: false,// Boolean form by default
    loadingPopUp: false,// Pop-up loading modal until receipt snackbar
    isGettingCountriesList: false, // Liste des pays dans le dropDown du formulaire
    countriesList: [], // Tableau vide pour la liste des pays dans le dropDown du formulaire
    interval: {}, // Interval timing for countDown
    countDown: 0, // countDown inactiv confirm button
    maxWidthTooltip: 350, // Taille du toolTip (icones i dans le formulaire)
    rawPdfFile: false,
  }),

  async mounted() {
    try {
      console.log('[Views][FormQrView][mounted] Getting countries list')
      this.isGettingCountriesList = true
      this.countriesList = await ApiService.getListCountries()
    } catch (e) {
      console.error('[Views][FormQrView][mounted] An error has occurred when getting countries list', e)
      //todo handle error
    } finally {
      this.isGettingCountriesList = false
    }

    /**
     * See N_M_F below
     */
    this.interval = setInterval(() => {
      if (this.countDown <= 1) {
        return (this.countDown = 0)
      }
      this.countDown -= 1
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },

  watch: {
    /**
     * activates the modal until the value is equal.
     * @param {*} val
     * @author Xavier de Juan
     */
    loadingPopUp(val) {
      if (!val) return
    },
  },

  methods: {
    /**
     * Drag and drop function that retrieves file, file name and file type
     * The file name is reused
     * File type is used to certify whether it is a pdf or not
     * @param {*} e 
     * @author Xavier de Juan
     */
    onDrop(e) {
      this.rawPdfFile = false
      this.dragover = false
      this.dropTakeName = e.dataTransfer.files[0].name
      this.isAPdf = e.dataTransfer.files[0].type === "application/pdf"
      if (this.isAPdf) {
        this.rawPdfFile = e.dataTransfer.files[0]
        this.cardStateColor = true
      } else if (!this.isAPdf) {
        this.removeDivaltoFile()
        this.cardStateColor = false
        this.dropTakeName = "L'importation du fichier a échoué. Le format du fichier doit être un .pdf"
      }
    },
    /**
     * Function that deletes the imported pdf file.
     * @author Xavier de Juan
     */
    removeDivaltoFile() {
      this.divaltoFile = null
      this.divaltoFileBlob = null
      this.dropTakeName = null
      this.isAPdf = false
    },

    /**
     * Function that changes the pdf file (object to Blob format)
     * @param {*} divaltoFile -
     * @return Blob 
     * @author Xavier de Juan -
     */
    async sendDivaltoPdf(divaltoFile) {
      console.log("[views][FormQrView][sendDivaltoPdf] Converti le fichier pdf en fichier Blob avec paramètre", divaltoFile)
      try {
        const response = await ApiService.unlockPdf(divaltoFile)
        const pdf = await response.data.arrayBuffer()
        const pdfBytes = await PdfService.callPdfLibrary(pdf)   
        this.divaltoFileBlob = new Blob([pdfBytes], { type: "application/pdf" })
      } catch (e) {
        console.error("[views][FormQrView][sendDivaltoPdf] Erreur durant la conversion du pdf en Blob")
        throw new Error(e)
      }
    },
    /**
      * N_M_F
      * 
      * Not My Fault
      */
    /**
     * Fonction qui met durant 15 secondes le bouton "confirmer" non cliquable.
     * (Une personne dont le nom restera secret, est coupable de cette idée et
     *  non l'auteur de ces lignes qui est bien trop gentil
     *  et bienveillant pour avoir une idée si insoutenablement machiavélique et cruelle...)
     * @author Xavier de Juan
     */
    activCountDown() {
      this.countDown = process.env.VUE_APP_FORMQR_COUNT_CONFIRM_BUTTON
    },
    inactivCountDown() {
      this.countDown = 0
    },

    /**
     *Function that call validate (see validate())
     *Hide the "check" modal
     *Show the loading pop-up
     *@return void
     *@author Marco Tribuzio
     *@author Xavier de Juan
     */
    async confirm() {
      console.error('[Views][FormQrView][sendCsvList] Send the form')
      try {
        const isValidForm = this.validateForm()
        if (isValidForm) {
          this.showLoadingPopUp()

          const payload = {
            "creditorInformation": {
              "iban": process.env.VUE_APP_CREDITOR_INFORMATION_IBAN,
              "creditor": {
                "addressType": "STRUCTURED",
                "name": process.env.VUE_APP_CREDITOR_INFORMATION_NAME,
                "streetName": process.env.VUE_APP_CREDITOR_INFORMATION_STREETNAME,
                "houseNumber": process.env.VUE_APP_CREDITOR_INFORMATION_HOUSENUMBER,
                "postalCode": process.env.VUE_APP_CREDITOR_INFORMATION_POSTALCODE,
                "city": process.env.VUE_APP_CREDITOR_INFORMATION_CITY,
                "country": process.env.VUE_APP_CREDITOR_INFORMATION_COUNTRY
              }
            },
            "paymentAmountInformation": {
              "amount": parseFloat(this.form.amount.replace(regex, subst)),
              "currency": process.env.VUE_APP_CREDITOR_INFORMATION_CURRENCY
            },
            "ultimateDebtor": {
              "addressType": "STRUCTURED",
              "name": this.form.dnom,
              "streetName": this.form.dstreet,
              "houseNumber": this.form.dnr,
              "postalCode": this.form.dnpa,
              "city": this.form.dplace,
              "country": this.form.dcountry
            },
            "paymentReference": {
              "referenceType": process.env.VUE_APP_CREDITOR_INFORMATION_REFERENCETYPE,
              "reference": this.form.nrref,
              "additionalInformation": {
                "unstructuredMessage": this.form.infosupp
              }
            },
          }

          this.divaltoFile = await this.sendDivaltoPdf(this.rawPdfFile)


          const response = await ApiService.sendSinglePayment(payload)

          // set the blog type to final pdf
          const qrFileBlob = new Blob([response.data], { type: 'application/pdf' });

          const sendtomerge = await ApiService.mergeFiles(this.divaltoFileBlob, qrFileBlob)

          // process to auto download it
          const fileURL = URL.createObjectURL(sendtomerge);
          const link = document.createElement('a');
          let date = new Date();
          let dateActuelle = date.getDate() + "_" + (date.getMonth() + 1) + "_" + (date.getFullYear());
          link.href = fileURL;
          link.download = "Facture_" + this.form.dnom + "_" + dateActuelle + ".pdf";
          link.click();
          this.hideDialog()
          this.showSnackbarSuccess();
          this.reset();
          this.removeDivaltoFile()
        }
      } catch (e) {
        this.showSnackbarError();
        console.error('[Views][FormQrView][sendCsvList] An error has occurred when send the form', e)
      } finally {
        this.dialog = false
        this.hideLoadingPopUp()
      }
    },

    /*
     * FORM
     */

    /**
     * Function that check required fields form if valid
     * Send the payload to the API
     * @author Bachir Aouad
     * @return string
     */
    validateForm() {
      return this.$refs.form.validate();
    },
    /**
     * Function that reset the form
     * @author Xavier de Juan
     * @return void
     */
    reset() {
      this.$refs.form.reset();
      // this.cardStateColor = true
    },

    /*
     * DIALOG
     */

    /**
     * Function that show the modal "check" form
     * @author Xavier de Juan
     * @return boolean/numbers
     */
    showDialog() {
      const isValid = this.$refs.form.validate();
      if (this.isAPdf && isValid) {
        this.dialog = true;
        this.activCountDown();
      } else if (!this.isAPdf && isValid) {
        this.cardStateColor = false;
      } else if (this.isAPdf && !isValid) {
        this.cardStateColor = true;
      } else if (!this.isAPdf && !isValid) {
        this.cardStateColor = false;
      }
    },

    /**
     * Function that hide the modal "check" form
     * @author Xavier de Juan
     * @return boolean/number
     */
    hideDialog() {
      this.dialog = false;
      this.inactivCountDown()
    },

    /**
     * LOADING POP-UP
     */

    /**
     * Function that show the loading pop-up during API's await
     * @author Xavier de Juan
     */
    showLoadingPopUp() {
      this.loadingPopUp = true
    },

    /**
     * Function that hide the loading pop-up
     * @author Xavier de Juan
     */
    hideLoadingPopUp() {
      this.loadingPopUp = false
    },

    /*
     * SNACKBAR
     */

    /**
     * Function that show the snackbar when QR code is not received
     * @author Xavier de Juan
     * @return boolean
     */
    showSnackbarError() {
      this.snackbar.text = "Une erreur est survenue lors du téléchargement du code QR"
      this.snackbar.color = "error"
      this.snackbar.flag = true
    },

    /**
     * Function that hide the snackbar
     * @author Xavier de Juan
     * @return boolean
     */
    hideSnackBar() {
      this.snackbar.flag = false
      this.snackbar.text = null
      this.snackbar.color = null
    },

    /**
     * Function that show the snackbar when QR code is received
     * @author Xavier de Juan
     * @return boolean
     */
    showSnackbarSuccess() {
      this.snackbar.text = "Code QR téléchargé avec succès."
      this.snackbar.color = "success"
      this.snackbar.flag = true
    },

    /**
     * Function that permit numbers and dot only "champ: Montant"
     * @author Xavier de Juan
     * @return numbers/dot
     */
    nombreSeulement(e) {
      let nombres = (e.which) ? e.which : e.keyCode;
      if ((nombres > 31 && (nombres < 48 || nombres > 57)) && nombres !== 46)
      // && (nombres 188(Virgule) && 222 (Apostrophe))
      {
        e.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
.modalDialogStyle {
  font-size: x-large;
}


.background {
  background-color: rgb(255, 255, 255);
}
</style>