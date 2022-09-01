<!-- Form to send to payload to get back a PDF/Qr file -->
<template>
  <v-row>
    <v-col lg="4" md="4" sm="12" xs="12">
      Here little description what the user have to do :)

    </v-col>
    <v-col lg="8" md="8" sm="12" xs="12">
      <!-- <h1>Bénéficiaire</h1> -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <!--Text fields form for the debtors -->
        <h1>Débiteur</h1>
        <!-- todo set rules with one in the api -->

        <v-text-field v-model="form.dnom" :rules="formRules.dnom" label="Nom">
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" dark v-bind="attrs" v-on="on">
                  info
                </v-icon>
              </template>
              <span>Nom ou entreprise du débiteur final
                70 caractères au maximum
                prénom (optionnel, si disponible) et nom ou raison sociale</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dstreet" :rules="formRules.dstreet" label="Rue" required>
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Rue/Case postale du débiteur final
                70 caractères au maximum admis
                ne peut pas contenir un numéro de maison ou de bâtiment.</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dnr" :rules="formRules.dnr" label="Numéro de rue" required append-icon="info">
          <template v-slot:append>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Numéro de maison du débiteur final
                16 caractères au maximum admis</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dnpa" :rules="formRules.dnpa" label="Code postal" required>
          <template v-slot:append>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Code postal du débiteur final 16 caractères au maximum admis
                toujours à indiquer sans code de pays de tête</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.dplace" :rules="formRules.dplace" label="Ville" required>
          <template v-slot:append>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Lieu du débiteur final
                35 caractères au maximum admis</span>
            </v-tooltip>
          </template>
        </v-text-field>

        <v-autocomplete v-model="form.dcountry" label="Pays (Veuillez cliquer ici pour sélectionner un pays)"
          :rules="formRules.dcountry" :items="countriesList" item-text="french" item-value="code">
          <!-- <template v-slot:append>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Pays du débiteur final
                Code de pays à deux positions selon ISO 3166-1</span>
            </v-tooltip>
          </template> -->
        </v-autocomplete>

        <h1>Information sur le montant du paiement</h1>
        <v-text-field v-model="form.amount" :rules="formRules.amount" label="Montant" required>
          <template v-slot:append>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Montant du paiement
                L'élément est à indiquer sans zéros de tête y compris séparateur décimal et deux décimales.
                Décimal, 12 positions au maximum admises, y compris séparateur décimal. Seul le point («.») est admis
                comme séparateur décimal.</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-text-field v-model="form.nrref" :rules="formRules.nrref" label="Numéro de référence" required>
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Numéro de référence
                Référence de paiement structurée
                Remarque: La référence est soit une référence QR, soit une Creditor Reference (ISO 11649)
                27 caractères alphanumériques au maximum
                Doit être rempli en cas d'utilisation d'un QR-IBAN.
                Référence QR: 27 caractères numériques, calcul du chiffre de contrôle selon modulo 10 récursif (27e
                position de la référence).
                Creditor Reference (ISO 11649): jusqu'à 25 caractères alphanumériques.
                L'élément ne doit pas être rempli pour le type de référence NON.</span>
            </v-tooltip>
          </template>
        </v-text-field>
        <v-textarea v-model="form.infobill" label="Informations de facture (facultatif)">
          <template v-slot:append>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Les informations structurelles de l'émetteur de factures contiennent des informations codées pour la
                comptabilisation automatisée du paiement. Les données ne sont pas transmises avec le paiement. 140
                caractères au maximum.</span>
            </v-tooltip>
          </template>
        </v-textarea>
        <v-textarea v-model="form.infosupp" label="Informations supplémentaires (facultatif) 56 CARACTÈRES MAX.">
          <template v-slot:append>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">info</v-icon>
              </template>
              <span>Les informations instructurées peuvent être utilisées pour l'indication d'un motif de paiement ou
                pour des informations textuelles complémentaires au sujet de paiements avec référence structurée. 140
                caractères au maximum</span>
            </v-tooltip>
          </template>
        </v-textarea>
      </v-form>

      <!--Buttons calling functions for the form-->
      <v-btn color="success" class="mr-10" outlined x-large rounded elevation="10" @click="showDialog()">Valider</v-btn>
      <v-btn color="error" class="ml-10" outlined x-large rounded elevation="10" @click="reset()">Effacer</v-btn>

      <!--Modal to check and confirm the form -->
      <v-dialog v-model="dialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <h1>Vérification avant confirmation d'envoi.</h1>
          </v-card-title>

          <!-- Checkform in the modal -->
          <v-card-text>
            <v-row class="container">
              <v-col cols="4" class="modalstyle">
                <p><b><i>Nom</i></b>: {{ form.dnom }}</p>
                <p><b><i>Rue</i></b>: {{ form.dstreet }}</p>
                <p><b><i>Numéro de rue</i></b>: {{ form.dnr }}</p>
                <p><b><i>Code postal</i></b>: {{ form.dnpa }}</p>
                <p><b><i>Ville</i></b>: {{ form.dplace }}</p>
                <p><b><i>Pays</i></b>: {{ form.dcountry }}</p>
                <p><b><i>Montant</i></b>: {{ form.amount }}</p>
                <p><b><i>Numéro de référence</i></b>: {{ form.nrref }}</p>
                <p><b><i>Informations de facture</i></b>: {{ form.infobill }}</p>
                <p><b><i>Informations supplémentaires</i></b>: {{ form.infosupp }}</p>
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

            <v-btn color="success" class="mr-16" x-large rounded elevation="5" :loading="loading" :disabled="loading"
              @click="confirm()">
              Confirmer
              <template v-slot:loader>
                <span>Disponible dans <v-progress-circular :size="70" :width="0" :value="countDown" color="orange">
                    {{ countDown }}
                  </v-progress-circular></span>
              </template>
            </v-btn>


            <v-btn color="error" class="ml-10" x-large rounded elevation="5" text @click="hideDialog()">
              Retour
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Pop-up when the QR code is received -->
      <v-snackbar v-model="snackbar.flag" :color="snackbar.color">
        {{ snackbar.text }}
      </v-snackbar>

      <v-dialog v-model="loadingPopUp" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Veuillez patienter, en attente de réception
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
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
    preConfirmLoadingButton: null,
    loading: false,
    show: false,
    snackbar: {
      flag: false,
      text: null,
      color: null,
    },

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
        (v) => !!v || "Le champ 'Nom' est obligatoire.",
        (v) => (v && v.length <= 70) || "Le nom ne peut excéder 70 caractères.",
      ],
      dstreet: [
        (v) => !!v || "Le champ 'Rue' est obligatoire.",
        (v) => (v && v.length <= 70) || "La rue ne peut excéder 70 caractères.",
      ],
      dnr: [
        (v) => !!v || "Le champ 'Numéro de rue' est obligatoire.",
        (v) => (v && v.length <= 16) || "Le n° de rue ne peut excéder 16 caractères.",
      ],
      dnpa: [
        (v) => !!v || "Le champ 'Code postal' est obligatoire.",
        (v) => (v && v.length <= 16) || "Le code postal ne peut excéder 16 caractères.",
      ],
      dplace: [
        (v) => !!v || "Le champ 'Ville' est obligatoire.",
        (v) => (v && v.length <= 35) || "La ville ne peut excéder 35 caractères.",
      ],
      dcountry: [
        (v) => !!v || 'Veuillez selectionner un pays',
      ],
      amount: [
        (v) => !!v || "Le champ 'Montant est obligatoire.",
        (v) => (v && v.length <= 12) || "Le montant ne peut excéder 12 caractères.",
      ],
      nrref: [
        (v) => !!v || "Le champ 'Numéro de référence est obligatoire.",
        (v) => (v && v.length <= 27) || "La référence ne peut excéder 27 caractères.",
      ],
      infosupp: [
        (v) => !!v || "",
        (v) => (v && v.length <= 27) || "",
      ],
      infobill: [
        (v) => !!v || "",
        (v) => (v && v.length <= 140) || "La référence ne peut excéder 27 caractères.",
      ],
    },
    dialog: false,// Boolean modal by default
    valid: false,// Boolean form by default
    loadingPopUp: false,
    isGettingCountriesList: false,
    countriesList: [],
    interval: {},
    countDown: null,
    //----------------------------------------------------
    counting: false,
    //----------------------------------------------------
  }),
  beforeDestroy() {
    // clearInterval(this.interval)

  },

  async mounted() {
    try {
      console.log('[Views][CsvView][mounted] An error has occurred when getting countries list')
      this.isGettingCountriesList = true
      const response = await ApiService.getListCountries()
      this.countriesList = response
      console.log(this.countriesList)
    } catch (e) {
      console.error('[Views][CsvView][mounted] An error has occurred when getting countries list', e)
      //todo handle error
    } finally {
      this.isGettingCountriesList = false
    }
    this.interval = setInterval(() => {
      if (this.countDown === 0) {
        return (this.countDown = null)
      }
      this.countDown -= 1
    }, 1000)
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
    /**
     * Fonction qui met durant 15 secondes le bouton "confirmer" non cliquable.
     * (Marco est le coupable de cette idée et non l'auteur de ces lignes qui est bien trop gentil 
     * et bienveillant pour avoir une idée si insoutenablement machiavélique et cruelle...)
     * 
     * @author Xavier de Juan
     */

    preConfirmLoadingButton() {
      const l = this.preConfirmLoadingButton
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 15000)
      console.log("timeout", l)
      this.preConfirmLoadingButton = null
    },

    resetTimeout() {
      const l = this.preConfirmLoadingButton
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 0)
    },
  },

  methods: {
    //------------------------------------------------------------------------
    startCountdown: function () {
      this.counting = true;
    },
    onCountdownEnd: function () {
      this.counting = false;
    },
    //------------------------------------------------------------------------
    /**
     * THE DOOMED BUTTON
     */

    /**
     * Fonction qui met le bouton "confirm en état non-cliquable"
     */
    activpreConfLoadBtn() {
      this.preConfirmLoadingButton = 'loading'
    },

    desactivConfLoadBtn() {
      this.preConfirmLoadingButton = null
    },

    /**
     * Function that call validate (see validate())
     * Hide the "check" modal
     * Show the loading pop-up
     * 
     * @author Xavier de Juan
     * @return ????
     */
    async confirm() {
      try {
        const isValidForm = this.validateForm()
        if (isValidForm) {
          console.log(typeof parseFloat(this.form.amount.replace(regex, subst)))
          this.showLoadingPopUp()
          this.hideDialog()
          // const ciao = {
          //   "creditorInformation": {
          //     "iban": "CH4431999123000889012",
          //     "creditor": {
          //       "addressType": "STRUCTURED",
          //       "name": "Robert Schneider AG",
          //       "streetName": "Rue du Lac",
          //       "houseNumber": "1268",
          //       "postalCode": "2501",
          //       "city": "Biel",
          //       "country": "CH"
          //     }
          //   },
          //   "paymentAmountInformation": {"amount": 1949.75, "currency": "CHF"},
          //   "ultimateDebtor": {
          //     "addressType": "STRUCTURED",
          //     "name": "Pia-Maria Rutschmann-Schnyder",
          //     "streetName": "Grosse Marktgasse",
          //     "houseNumber": "28",
          //     "postalCode": "9400",
          //     "city": "Rorschach",
          //     "country": "CH"
          //   },
          //   "paymentReference": {
          //     "referenceType": "QRR",
          //     "reference": "210000000003139471430009017",
          //     "additionalInformation": {
          //       "unstructuredMessage": "Instruction of 03.04.2019",
          //       "billInformation": "//S1/10/10201409/11/190512/20/1400.000-53/30/106017086/31/180508/32/7.7/40/2:10;0:30"
          //     }
          //   },
          //   "alternativeSchemes": {"alternativeSchemeParameters": ["Name AV1: UV;UltraPay005;12345", "Name AV2: XY;XYService;54321"]}
          //  }
          // }
          const test = {
            "creditorInformation": {
              //"iban": "CH0509000000120187130", IBAN réalise (A garder pour la version achetée de l'API)
              "iban": "CH4431999123000889012",// A utiliser tel quel pendant la version démo
              "creditor": {
                "addressType": "STRUCTURED",
                "name": "Realise",
                "streetName": "Rue Viguet",
                "houseNumber": "8",
                "postalCode": "1227",
                "city": "Genève",
                "country": "CH"
              }
            },
            "paymentAmountInformation": { "amount": parseFloat(this.form.amount.replace(regex, subst)), "currency": "CHF" },
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
              "referenceType": "QRR",
              "reference": "210000000003139471430009017",// A utiliser tel quel pendant la version démo
              // "reference": this.form.nrref, (A garder pour la version achetée de l'API)
              "additionalInformation": {
                "unstructuredMessage": this.form.infosupp,// ATTENTION 56 CARACTERES.
                "billInformation": "//S1/10/10201409/11/190512/20/1400.000-53/30/106017086/31/180508/32/7.7/40/2:10;0:30"// Garder tel quel pendant la version démo
                //"billInformation": this.form.billInfo (A garder pour la version achetée de l'API)
              }
            },
            "alternativeSchemes": { "alternativeSchemeParameters": ["Name AV1: UV;UltraPay005;12345", "Name AV2: XY;XYService;54321"] }
          }

          const response = await ApiService.sendSinglePayment(test)
          console.log("test payload", test)
          // set the blog type to final pdf
          const file = new Blob([response.data], { type: 'application/pdf' });

          // process to auto download it
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement('a');
          let date = new Date();
          let dateActuelle = date.getDate() + "_" + (date.getMonth() + 1) + "_" + (date.getFullYear());
          link.href = fileURL;
          link.download = "Facture_" + this.form.dnom + "_" + dateActuelle + ".pdf";
          link.click();
          this.showSnackbarSuccess();
          this.reset()
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
     * Function that reset the form
     * @author Xavier de Juan
     * @return void
     */
    reset() {
      this.$refs.form.reset();
    },

    /*
     * DIALOG
     */

    /**
     * Function that show the modal "check" form
     * @author Xavier de Juan
     * @return boolean
     */
    showDialog() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.dialog = true;
        this.activpreConfLoadBtn();
        this.countDown = 15
      }
    },

    /**
     * Function that hide the modal "check" form
     * @author Xavier de Juan
     * @return boolean
     */
    hideDialog() {
      this.dialog = false;
      this.desactivConfLoadBtn()
      this.countDown = null
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
  }
};
</script>

<style>
.modalstyle {
  font-size: x-large;
}
</style>