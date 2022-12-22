<template class="background">
  <v-row class="background">
    <!-- Drag and drop -->
    <v-col></v-col>
    <v-col align="center" lg="4" md="4" sm="12" xs="12" class="sureleve">
      <h1>Facture Divalto</h1>
      <v-sheet elevation="3" outlined :color="cardErrorColor ? 'red' : 'black'" rounded>
        <v-card @drop.prevent="onDrop($event)" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
          :class="{ 'grey lighten-2': dragover }">
          <v-card-text>
            <p :class="cardErrorColor ? 'red--text' : 'black--text'">{{ dropTakeName }}</p>
            <v-row class="d-flex flex-column" dense align="center" justify="center">
              <v-icon class="mt-5" size="60" :color="isAPdf ? 'green' : 'grey'">{{ isAPdf ?
                  'mdi-cloud-check' : 'mdi-cloud-upload'
              }}</v-icon>
              <p :class="cardErrorColor ? 'red--text' : 'black--text'">
                {{ isAPdf ? 'Importation réussie' : 'Glissez-déposez ici la facture Divalto à importer (format.pdf)' }}
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
    <v-col lg="5" md="5" sm="12" xs="12">
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
              <span>Nom ou entreprise du bénéficiaire selon la désignation de compte.
                Remarque: correspond toujours au titulaire du compte
                70 caractères au maximum
                prénom (optionnel, si disponible) et nom ou raison sociale.</span>
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
        <!-- :items="getreadPdf" -->
        <v-autocomplete v-model="form.dcountry" :label="traduis('formqrcode.pays')" :rules="formRules.dcountry"
          :items="countriesListGetter" item-text="french" item-value="code">
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
        <v-row>
          <v-col align="center">
            <!--Buttons calling functions for the form-->
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" color="success" outlined large
                  @click="showDialog()">
                  {{ traduis('formqrcode.valider') }}
                </v-btn>
              </template>
            </v-hover>
          </v-col>
          <!-- <v-col></v-col> -->
          <v-col align="center">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" color="error" outlined large
                  @click="reset()">
                  {{ traduis('formqrcode.effacer') }}
                </v-btn>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-form>
      <!--Modal to check and confirm the form -->
      <v-dialog v-model="dialog" max-width="60%" persistent>
        <v-card>
          <v-row>
            <v-col>
              <v-card-title id="verifConfirmModale">
                <h1>{{ this.traduis('modale.verifConfirm') }}</h1>
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>
          <!-- Checkform in the modal -->
          <v-card-text>
            <v-row>
              <v-col cols="10" class="modalDialogStyle">
                <v-row>
                  <v-col cols="12">
                    <p><strong><em>Facture Divalto</em></strong> : {{ dropTakeName }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('formqrcode.nom') }}</i></b> : {{ form.dnom }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('formqrcode.rue') }}</i></b> : {{ form.dstreet }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('formqrcode.numDeRue') }}</i></b> : {{ form.dnr }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('formqrcode.codePostal') }}</i></b> : {{ form.dnpa }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('formqrcode.ville') }}</i></b> : {{ form.dplace }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('modale.pays') }}</i></b> : {{ form.dcountry }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('formqrcode.montant') }}</i></b> : {{ form.amount }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('modale.numRef') }}</i></b> : {{ form.nrref }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p><b><i>{{ this.traduis('modale.infoSupp') }}</i></b> : {{ form.infosupp }}</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- Confirm or return buttons calling the functions -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-row>
              <v-col align="right">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" color="success" large outlined
                      :loading="!!countDown" :disabled="!!countDown" @click="confirm()">
                      {{ traduis('modale.confirmer') }}
                      <template v-slot:loader>
                        <span>
                          <v-progress-circular :indeterminate="true" :size="40" :value="countDown" :width="5"
                            color="orange">
                            {{ countDown }}
                          </v-progress-circular>
                        </span>
                      </template>
                    </v-btn>
                  </template>
                </v-hover>
              </v-col>
              <v-col align="center">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" color="error" outlined large
                      @click="hideDialog()">
                      {{ traduis('modale.annuler') }}
                    </v-btn>
                  </template>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col></v-col>
    <LoadingPopUpVue ref="loadingPopUp" />
    <SnackBar ref="snackbar" />
  </v-row>
</template>
<script>
import { traductionMixin } from "@/mixins/traductionMixin.js";
import Vue from "vue";
import LoadingPopUpVue from "../components/LoadingPopUp.vue";
import SnackBar from '../components/SnackBar.vue';
import { SUCCESSCODE } from "@/libs/consts";
import { ERRORCODE } from "@/libs/consts";
import { STORE_ACTIONS_EXT } from '../libs/consts.js' 
import { STOREGETTERS } from "@/libs/consts.js";
export default {
  name: "FormQr",
  mixins: [traductionMixin],
  components: { LoadingPopUpVue, SnackBar },
  computed: {
    countriesListGetter() {
      return this.$store.getters[STOREGETTERS.COUNTRIESLIST]
    },
  },
  data: () => ({
    dragover: false, // Reaction to the passage of the file above the drag & drop
    dropTakeName: "", // Variable that retrieves the file name or the error message in case of no pdf
    cardErrorColor: false, // Black or red color of the edge of the frame and the text of the drag & drop the default state is true (black color)
    isAPdf: false, // Check if it is a pdf or not
    // divaltoFile: null, // PDF file
    // divaltoFileBlob: null, // pdf file converted to Blob
    // qrFileBlob: null, // Pdf file received from API
    snackbar: { // API merge file receipt status message
      flag: false,
      text: "",
      color: ""
    },
    // Form
    form: {
      dnom: "",
      dstreet: "",
      dnr: "",
      dnpa: "",
      dplace: "",
      dcountry: "CH",
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
    // isGettingCountriesList: false, // Liste des pays dans le dropDown du formulaire
    // countriesList: [], // Tableau vide pour la liste des pays dans le dropDown du formulaire
    interval: {}, // Interval timing for countDown
    countDown: 0, // countDown inactiv confirm button
    maxWidthTooltip: 350, // Taille du toolTip (icones i dans le formulaire)
    rawPdfFile: {},
  }),
  /**
   * Function that get the countries list
   * @returns {promise}
   * @author - Marco Tribuzio
   */
  async mounted() {
    try {
      console.log('[Views][FormQrView][mounted] Getting countries list')
      this.isGettingCountriesList = true
      await this.$store.dispatch(STORE_ACTIONS_EXT.COUNTRIESLIST)
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
  beforeUnmount() {
    clearInterval(this.interval)
  },
  watch: {
    /**
     * activates the modal until the value is equal.
     * @param {*} val
     * @author - Xavier de Juan
     */
    loadingPopUp(val) {
      if (!val) return
    },
  },
  methods: {
    readPdfGetter() {
      return this.$store.getters[STOREGETTERS.READPDF]
    },
    unlockPdfGetter() {
      return this.$store.getters[STOREGETTERS.UNLOCKPDF]
    },
    callPdfLibraryGetter() {
      return this.$store.getters[STOREGETTERS.CALLPDFLIBRARY]
    },
    sendSinglePaymentGetter() {
      return this.$store.getters[STOREGETTERS.SENDSINGLEPAYMENT]
    },
    blobQrPdfGetter() {
      return this.$store.getters[STOREGETTERS.BLOBQRPDF]
    },
    blobDivaltoPdfGetter() {
      return this.$store.getters[STOREGETTERS.BLOBDIVALTOPDF]
    },
    callPdfLengthLibGetter() {
      return this.$store.getters[STOREGETTERS.CALLPDFLENGTHLIB]
    },
    sendMergedFilesGetter() {
      return this.$store.getters[STOREGETTERS.SENDMERGEDFILES]
    },    
    /**
     * Drag and drop function that retrieves file, file name and file type
     * The file name is reused
     * File type is used to certify whether it is a pdf or not
     * @param {*} e 
     * @author - Xavier de Juan
     */
    async onDrop(e) {
      try {
        this.rawPdfFile = {}
        this.dragover = false
        this.dropTakeName = e.dataTransfer.files[0].name
        this.isAPdf = e.dataTransfer.files[0].type === "application/pdf"
        if (this.isAPdf) {
          this.rawPdfFile = e.dataTransfer.files[0]
          this.cardErrorColor = false
          await this.$store.dispatch(STORE_ACTIONS_EXT.READPDF, this.rawPdfFile);
          this.BuildForm();
        } else if (!this.isAPdf) {
          this.cardErrorColor = true
          this.dropTakeName = "L'importation du fichier a échoué. Le format du fichier doit être un .pdf"
        }
      } catch (e) {
        console.error(e) //todo handle error
      }
    },
    /**
     * Function that build form after onDrop
     * @return {promise}
     * @author - Xavier de Juan
     */
    async BuildForm() {
      const response = await this.readPdfGetter();
      this.form.dnom = response.name
      this.form.dnpa = response.npa
      this.form.dstreet = response.address
      this.form.dnr = response.addressNumber
      this.form.dplace = response.city
      this.form.amount = response.totalAmount
      this.form.nrref = response.referenceNumber
      this.form.infosupp = response.infoSupp
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
     * @author - Xavier de Juan
     */
    activCountDown() {
      this.countDown = process.env.VUE_APP_FORMQR_COUNT_CONFIRM_BUTTON
    },
    inactivCountDown() {
      this.countDown = 0
    },
    /**
     *Function that once form is validate send and receive object and file to the store managent
     *and download the pdf file in the computer
     *@returns {object}
     *@author - Marco Tribuzio
     *@author - Xavier de Juan
     */
    async confirm() {
      console.log('[Views][FormQrView][sendCsvList] Send the form')
      try {
        const isValidForm = this.validateForm()
        if (isValidForm) {
          this.$refs.loadingPopUp.showLoadingPopUp()
          const rawPdfAndPayload = {
            formToApi: this.form,
            rawPdf: this.rawPdfFile
          }
          await this.$store.dispatch(STORE_ACTIONS_EXT.UNLOCKPDF, rawPdfAndPayload)
          const sendToMerge = await this.sendMergedFilesGetter()
          // process to auto download it
          const fileURL = URL.createObjectURL(sendToMerge);
          const link = document.createElement('a');
          let date = new Date();
          let dateActuelle = date.getDate() + "_" + (date.getMonth() + 1) + "_" + (date.getFullYear());
          link.href = fileURL;
          link.download = "Facture_" + this.form.dnom + "_" + dateActuelle + ".pdf";
          link.click();
          this.hideDialog()
          this.reset();
          this.$refs.snackbar.handleSuccess(SUCCESSCODE.QRCODEDOWNLOADED);
        }
      } catch (e) {
        this.$refs.snackbar.handleError(ERRORCODE.ERRORQRCODEDOWNLOAD);
        console.error('[Views][FormQrView][sendCsvList] An error has occurred when send the form', e)
      } finally {
        this.dialog = false
        this.$refs.loadingPopUp.hideLoadingPopUp()
      }
    },
    /*
     * FORM
     */
    /**
     * Function that check required fields form if valid
     * Send the payload to the API
     * @returns string
     * @author Bachir Aouad
     */
    validateForm() {
      return this.$refs.form.validate();
    },
    /**
     * Function that reset the form
     * @returns {void}
     * @author - Xavier de Juan
     * 
     */
    reset() {
      this.$refs.form.reset();
      this.dropTakeName = ""
      this.isAPdf = false
      this.cardErrorColor = false
      Vue.nextTick(() => {
        this.form.dcountry = "CH"
      });
    },
    /*
     * DIALOG
     */
    /**
     * Function that show the modal "check" form
     * @returns {boolean}
     * @author - Xavier de Juan
     */
    showDialog() {
      const isValid = this.$refs.form.validate();
      if (this.isAPdf && isValid) {
        this.dialog = true;
        this.activCountDown();
      } else if (this.isAPdf && !isValid) {
        this.cardErrorColor = false
      } else if (!this.isAPdf && !isValid) {
        this.cardErrorColor = true
      } else if (!this.isAPdf && isValid) {
        this.cardErrorColor = true
      } 
    },
    /**
     * Function that hide the modal "check" form
     * @returns {boolean}
     * @author - Xavier de Juan
     
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
     * @returns {boolean}
     * @author - Xavier de Juan
     */
    showLoadingPopUp() {
      this.loadingPopUp = true
    },
    /**
     * Function that hide the loading pop-up
     * @returns {boolean}
     * @author - Xavier de Juan
     */
    hideLoadingPopUp() {
      this.loadingPopUp = false
    },
    /**
     * Function that permit numbers and dot only "champ: Montant"
     * @returns {numbers/dot}
     * @author - Xavier de Juan
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

#verifConfirmModale {
  justify-content: center;
  text-decoration: underline;
}

.background {
  background-color: rgb(255, 255, 255);
}
</style>