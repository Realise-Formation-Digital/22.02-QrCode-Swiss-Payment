<!-- Form to send to payload to get back a PDF/Qr file -->
<template>
  <v-row>

    <v-col lg="4" md="4" sm="12" xs="12">
      <h1>Facture Divalto</h1>
      <!-- <v-file-input prepend-icon="false" accept="pdf/*" outlined :show-size="1000"
        label="Glissez-déposez ou cliquez ici (Format pdf)" @change="sendDivaltoPdf">
      </v-file-input> -->
      <v-sheet outlined :color="cardStateColor ? 'black' : 'red'" rounded>
        <v-card @drop.prevent="onDrop($event)" @dragover.prevent="dragover = true" @dragleave.prevent="dragover = false"
          :class="{ 'grey lighten-2': dragover }">
          <v-card-text>
            <v-btn @click.stop="removeDivaltoFile" icon>
              <v-icon> mdi-close-circle </v-icon>
            </v-btn>
            <p :class="cardStateColor ? 'black--text' : 'red--text'">{{ dropTakeName }}</p>
            <v-row class="d-flex flex-column" dense align="center" justify="center">
              <v-icon class="mt-5" size="60" :color="divaltoFileBlob ? 'green' : 'grey'">{{ divaltoFileBlob ?
              'mdi-cloud-check' : 'mdi-cloud-upload' }}</v-icon>
              <p :class="cardStateColor ? 'black--text' : 'red--text'">
                {{ divaltoFileBlob ? 'Importation réussie' : 'Glissez-déposer ici la facture Divalto à importer. (format .pdf)' }}
              </p>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col lg="8" md="8" sm="12" xs="12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <!--Text fields form for the debtors -->
        <h1>Débiteur</h1>

        <v-text-field v-model="form.dnom" :rules="formRules.dnom" counter label="Nom" maxlength="70" required>
          <template v-slot:append>
            <v-tooltip :max-width="maxWidthTooltip" top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" dark v-bind="attrs" v-on="on">
                  info
                </v-icon>
              </template>
              <span>Nom ou entreprise du débiteur final
                70 caractères au maximum.
                Nom, prénom (optionnel, si disponible) ou raison sociale</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dstreet" :rules="formRules.dstreet" counter label="Rue" maxlength="70" required>
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
        <v-text-field v-model="form.dnr" :rules="formRules.dnr" append-icon="info" counter label="Numéro de rue"
          maxlength="16" required>
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
        <v-text-field v-model="form.dnpa" :rules="formRules.dnpa" counter label="Code postal" maxlength="16" required>
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
        <v-text-field v-model="form.dplace" :rules="formRules.dplace" counter label="Ville" maxlength="16" required>
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
        <v-autocomplete v-model="form.dcountry" :items="countriesList" :rules="formRules.dcountry" item-text="french"
          item-value="code" label="Pays (Veuillez cliquer ici pour sélectionner un pays)">
        </v-autocomplete>

        <h1>Information sur le montant du paiement</h1>
        <v-text-field v-model="form.amount" :rules="formRules.amount" counter label="Montant" maxlength="12" required
          v-on:keypress="nombreSeulement">
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
        <v-text-field v-model="form.nrref" :rules="formRules.nrref" counter label="Numéro de référence" required>
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
        <v-text-field v-model="form.infosupp" :rules="formRules.infosupp" counter
          label="Informations supplémentaires (facultatif)" maxlength="56">
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
        <v-btn class="mr-10 mt-10" color="success" elevation="10" outlined rounded x-large @click="showDialog()">Valider
        </v-btn>
        <v-btn class="ml-10 mt-10" color="error" elevation="10" outlined rounded x-large @click="reset()">Effacer
        </v-btn>

        <!--Modal to check and confirm the form -->
        <v-dialog v-model="dialog" max-width="70%" persistent>
          <v-card>
            <v-card-title>
              <h1>Vérification avant confirmation d'envoi.</h1>
            </v-card-title>

            <!-- Checkform in the modal -->
            <v-card-text>
              <v-row class="container">
                <v-col class="modalDialogStyle" cols="4">
                  <p><strong><em>Facture Divalto</em></strong>: {{ dropTakeName }}</p>
                  <p><strong><em>Nom</em></strong>: {{ form.dnom }}</p>
                  <p><strong><em>Rue</em></strong>: {{ form.dstreet }}</p>
                  <p><strong><em>Numéro de rue</em></strong>: {{ form.dnr }}</p>
                  <p><strong><em>Code postal</em></strong>: {{ form.dnpa }}</p>
                  <p><strong><em>Ville</em></strong>: {{ form.dplace }}</p>
                  <p><strong><em>Pays</em></strong>: {{ form.dcountry }}</p>
                  <p><strong><em>Montant</em></strong>: {{ form.amount }}</p>
                  <p><strong><em>Numéro de référence</em></strong>: {{ form.nrref }}</p>
                  <p><strong><em>Informations supplémentaires</em></strong>: {{ form.infosupp }}</p>
                </v-col>
              </v-row>
            </v-card-text>
            <!-- Confirm or return buttons calling the functions -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!!countDown" :loading="!!countDown" class="mr-16" color="success" elevation="5" rounded
                x-large @click="confirm()">
                Confirmer
                <template v-slot:loader>
                  <span>
                    <v-progress-circular :indeterminate="true" :size="40" :value="countDown" :width="5" color="orange">
                      {{ countDown }}
                    </v-progress-circular>
                  </span>
                </template>
              </v-btn>
              <v-btn class="ml-10" color="error" elevation="5" rounded text x-large @click="hideDialog()">
                Retour
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
import ApiService from "@/services/apiService.js";

// Params used for amount.replace
const regex = /,/gm;
const subst = `.`;

export default {
  name: "FormQr",
  data: () => ({
    dragover: false, // Réaction au passage du fichier au dessus du drag & drop
    dropTakeName: null, // Variable qui récupère Le nom du fichier ou le message d'erreur en cas de non pdf
    cardStateColor: true, // Couleur noir ou rouge du bord du cadre et du texte du drag & drop 
    isAPdf: false, // Vérifie si c'est un pdf ou non
    divaltoFile: null, // fichier pdf
    divaltoFileBlob: null, // fichier pdf converti en Blob
    qrFileBlob: null, // Fichier pdf reçu de l'API
    snackbar: { // Message de l'état de réception du fichier mergé de l'API
      flag: false,
      text: null,
      color: null,
    },
    // Formulaire
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
        v => !!v || "Le champ 'Montant est obligatoire.",
        v => {
          if (v) return v.length <= 12 || "Le montant ne peut excéder 12 caractères.";
          else return true;
        }],
      nrref: [
        v => !!v || "Le champ 'Numéro de référence est obligatoire.",
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
    maxWidthTooltip: 350
  }),

  async mounted() {
    try {
      console.log('[Views][CsvView][mounted] An error has occurred when getting countries list')
      this.isGettingCountriesList = true
      this.countriesList = await ApiService.getListCountries()
    } catch (e) {
      console.error('[Views][CsvView][mounted] An error has occurred when getting countries list', e)
      //todo handle error
    } finally {
      this.isGettingCountriesList = false
    }

    /**
     * Voir W_I_H_M_F plus bas
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
     * active la modal tant que la valeur n'est pas égale.
     * @param {*} val
     * @author Xavier de Juan
     */
    loadingPopUp(val) {
      if (!val) return
    },
  },

  methods: {
    /**
     * Fonction de drag and drop qui récupère le fichier, le nom du fichier et le type de fichier
     * Le nom du fichier est réutilisé
     * Le type de fichier est utilisé pour cérifier si il s'agit d'un pdf ou non
     * @param {*} e 
     * @author Xavier de Juan
     */
    onDrop(e) {
      this.dragover = false
      this.divaltoFile = this.sendDivaltoPdf(e.dataTransfer.files[0])
      this.dropTakeName = e.dataTransfer.files[0].name
      this.isAPdf = e.dataTransfer.files[0].type === "application/pdf"
      console.log("isPdf", this.isAPdf)
      if (this.isAPdf) {
        this.cardStateColor = true
      } else if (!this.isAPdf) {
        this.removeDivaltoFile()
        this.cardStateColor = false
        this.dropTakeName = "L'importation du fichier a échoué. Le format du fichier doit être un .pdf"
      }
    },
    /**
     * Fonction qui efface le fichier pdf importé.
     * @author Xavier de Juan
     */
    removeDivaltoFile() {
      this.divaltoFile = null
      this.divaltoFileBlob = null
      this.dropTakeName = null
      this.isAPdf = false
    },

    /**
     * Fonction qui cahnge le fichier pdf (objet en format Blob)
     * @param {*} divaltoFile -
     * @author Xavier de Juan -
     * @return Blob 
     */
    async sendDivaltoPdf(divaltoFile) {
      try {
        console.log("[sendDivatopdf]", divaltoFile)
        this.divaltoFileBlob = new Blob([divaltoFile], { type: "application/pdf" })
        console.log("divalto File Blob", this.divaltoFileBlob)
      } catch (e) {
        console.error(e)
      }
    },
    /**
     * Welcome In Hell Marco's Function
     */

    /**
     * W_I_H_M_F
     * 
     * Fonction qui met durant 15 secondes le bouton "confirmer" non cliquable.
     * (Marco est le coupable de cette idée et non l'auteur de ces lignes qui est bien trop gentil
     * et bienveillant pour avoir une idée si insoutenablement machiavélique et cruelle...)
     * @author Xavier de Juan
     */
    activCountDown() {
      this.countDown = process.env.VUE_APP_FORMQR_COUNT_CONFIRM_BUTTON
    },
    inactivCountDown() {
      this.countDown = 0
    },

    /**
     * Function that call validate (see validate())
     * Hide the "check" modal
     * Show the loading pop-up
     *
     * @author Xavier de Juan
     * @return void
     */
    async confirm() {
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

          const response = await ApiService.sendSinglePayment(payload)

          // set the blog type to final pdf
          const qrFileBlob = new Blob([response.data], { type: 'application/pdf' });

          const sendtomerge = await ApiService.mergeFiles(this.divaltoFileBlob, qrFileBlob)

          // process to auto download it
          const fileURL = URL.createObjectURL(sendtomerge);
          console.log("linkFile", fileURL)
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
        console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
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
     * 
     */
    // cardColor() {
    //   this.isAPdf ? this.cardStateColor = true : this.cardStateColor = false
    // },

    /**
     * Function that reset the form
     * @author Xavier de Juan
     * @return void
     */
    reset() {
      this.$refs.form.reset();
      this.cardStateColor = true
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
</style>
