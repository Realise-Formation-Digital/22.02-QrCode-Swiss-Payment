<!-- Form to send to payload to get back a PDF/Qr file -->
<template>
  <v-row>
    <v-col lg="4" md="4" sm="12" xs="12">
      Here little descriptio what the user have to do :)
    </v-col>
    <v-col lg="8" md="8" sm="12" xs="12">
      <!-- <h1>Bénéficiaire</h1> -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <!--Text fields form for the debtors -->
        <h1>Débiteur</h1>
        <v-text-field v-model="form.dnom" :rules="formRules.dnom" label="Nom" required></v-text-field>
        <v-text-field v-model="form.dstreet" :rules="formRules.dstreet" label="Rue" required></v-text-field>
        <v-text-field v-model="form.dnr" :rules="formRules.dnr" label="N°" required></v-text-field>
        <v-text-field v-model="form.dnpa" :rules="formRules.dnpa" label="Code postal" required></v-text-field>
        <v-text-field v-model="form.dplace" :rules="formRules.dplace" label="Ville" required></v-text-field>
        <v-text-field v-model="form.dcountry" :rules="formRules.dcountry" label="Pays" required></v-text-field>
        <h1>Information sur le montant du paiement</h1>
        <v-text-field v-model="form.amount" :rules="formRules.amount" label="Montant" required></v-text-field>
        <v-text-field v-model="form.nrref" :rules="formRules.nrref" label="N° de référence" required></v-text-field>
        <v-text-field v-model="form.infosupp" label="Informations supplémentaires"></v-text-field>
      </v-form>

      <!--Buttons calling functions for the form-->
      <v-btn color="success" class="mr-10" outlined x-large rounded elevation="10" @click="showDialog()">Valider</v-btn>
      <v-btn color="error" class="ml-10" outlined x-large rounded elevation="10" @click="reset()">Effacer</v-btn>

      <!--Modal to check and confirm the form -->
      <v-dialog v-model="dialog" persistent max-width="80%">
        <v-card>
          <v-card-title>
            <h1>Vérification avant confirmation d'envoi</h1>
          </v-card-title>

          <!-- Checkform in the modal -->
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <p>nom:</p>
                <p>Street</p>
                <p>Numero</p>
                <p>NPA</p>
                <p>Place</p>
                <p>Country</p>
                <p>Amount</p>
                <p>Number ref</p>
                <p>Info Supp</p>
                <p></p>
              </v-col>
              <v-col cols="10">
                <p>{{ form.dnom }}</p>
                <p>{{ form.dstreet }}</p>
                <p>{{ form.dnr }}</p>
                <p>{{ form.dnpa }}</p>
                <p>{{ form.dplace }}</p>
                <p>{{ form.dcountry }}</p>
                <p>{{ form.amount }}</p>
                <p>{{ form.nrref }}</p>
                <p>{{ form.infosupp }}</p>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Confirm or return buttons calling the functions -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" class="mr-10" x-large rounded elevation="5"
                   :loading="isSendData" @click="confirm()">
              Confirmer
            </v-btn>
            <v-btn color="error" class="ml-10" x-large rounded elevation="5" text @click="hideDialog()">
              Retour
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Loading pop-up during the API's send -->
      <v-dialog v-model="dialogSendApi" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            En attente de réception
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Pop-up when the QR code is received -->
      <v-snackbar v-model="snackbar.flag" :color="snackbar.color">
        {{ snackbar.text }}
      </v-snackbar>


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
    snackbar: {
      flag: false,
      text: null,
      color: null
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
    },
    formRules: {
      dnom: [
        (v) => !!v || "Le nom est obligatoire.",
        (v) => (v && v.length <= 70) || "Le nom ne peut excéder 70 caractères.",
      ],
      dstreet: [
        (v) => !!v || "La rue est obligatoire.",
        (v) => (v && v.length <= 70) || "La rue ne peut excéder 70 caractères.",
      ],
      dnr: [
        (v) => !!v || "Le n° de rue est obligatoire.",
        (v) => (v && v.length <= 16) || "Le n° de rue ne peut excéder 16 caractères.",
      ],
      dnpa: [
        (v) => !!v || "Le n° postal est obligatoire.",
        (v) => (v && v.length <= 16) || "Le code postal ne peut excéder 16 caractères.",
      ],
      dplace: [
        (v) => !!v || "La ville est obligatoire.",
        (v) => (v && v.length <= 35) || "La ville ne peut excéder 35 caractères.",
      ],
      dcountry: [
        (v) => !!v || "Le pays est obligatoire et doit contenir 2 caractères. (ex:CH)",
        (v) => (v && v.length == 2) || "Le pays doit contenir 2 caractères. (ex:CH)",
      ],
      amount: [
        (v) => !!v || "Le montant est obligatoire.",
        (v) => (v && v.length <= 12) || "Le montant ne peut excéder 12 caractères",
      ],
      nrref: [
        (v) => !!v || "Le numéro de référence est obligatoire.",
        (v) => (v && v.length <= 27) || "La référence ne peut excéder 27 caractères",
      ],
      infosupp: [
        (v) => !!v || "",
        (v) => (v && v.length <= 27) || "",
      ],
    },
    dialog: false,// Boolean modal by default
    valid: false,// Boolean form by default
    dialogSendApi: false,// Boolean loading pop-up by default
    isSendData: false
  }),


  methods: {

    /**
     * Function taht call validate (see validate())
     * Hide the "check" modal
     * Show the loading pop-up
     * @author Xavier de Juan
     * @return ????
     */
    async confirm() {
      try {
        const isValidForm = this.validateForm()
        if (isValidForm) {
          console.log(typeof  parseFloat(this.form.amount.replace(regex, subst)))
          this.isSendData = true
          /*const ciao = {
            "creditorInformation": {
              "iban": "CH4431999123000889012",
              "creditor": {
                "addressType": "STRUCTURED",
                "name": "Robert Schneider AG",
                "streetName": "Rue du Lac",
                "houseNumber": "1268",
                "postalCode": "2501",
                "city": "Biel",
                "country": "CH"
              }
            },
            "paymentAmountInformation": {"amount": 1949.75, "currency": "CHF"},
            "ultimateDebtor": {
              "addressType": "STRUCTURED",
              "name": "Pia-Maria Rutschmann-Schnyder",
              "streetName": "Grosse Marktgasse",
              "houseNumber": "28",
              "postalCode": "9400",
              "city": "Rorschach",
              "country": "CH"
            },
            "paymentReference": {
              "referenceType": "QRR",
              "reference": "210000000003139471430009017",
              "additionalInformation": {
                "unstructuredMessage": "Instruction of 03.04.2019",
                "billInformation": "//S1/10/10201409/11/190512/20/1400.000-53/30/106017086/31/180508/32/7.7/40/2:10;0:30"
              }
            },
            "alternativeSchemes": {"alternativeSchemeParameters": ["Name AV1: UV;UltraPay005;12345", "Name AV2: XY;XYService;54321"]}
          }*/
          const test = {
            "creditorInformation": {
              //"iban": "CH0509000000120187130",
              "iban": "CH3908704016075473007",
              "creditor": {
                "addressType": "STRUCTURED",
                "name": "Realise",
                "streetName": "Rue du Lac",
                "houseNumber": "1268",
                "postalCode": "2501",
                "city": "Geneve",
                "country": "CH"
              }
            },
            "paymentAmountInformation": {
              "amount": 1949.75,
              "currency": "CHF"
            },
            "ultimateDebtor": {
              "addressType": "STRUCTURED",
              "name": "Pia-Maria Rutschmann-Schnyder",
              "streetName": "Grosse Marktgasse",
              "houseNumber": "28",
              "postalCode": "9400",
              "city": "Rorschach",
              "country": "CH"
            },
            "paymentReference": {
              "referenceType": "QRR",
              "reference": "210000000003139471430009017",
              "additionalInformation": {
                "unstructuredMessage": "Instruction of 03.04.2019",
                "billInformation": "//S1/10/10201409/11/190512/20/1400.000-53/30/106017086/31/180508/32/7.7/40/2:10;0:30"
              }
            },
            "alternativeSchemes": {"alternativeSchemeParameters": ["Name AV1: UV;UltraPay005;12345", "Name AV2: XY;XYService;54321"]}
          }

          const response = await ApiService.sendSinglePayment(test)

          // set the blog type to final pdf
          const file = new Blob([response.data], {type: 'application/pdf'});

          // process to auto download it
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = "FileName" + new Date().getTime() + ".pdf";
          link.click();
          this.showSnackbarSuccess();
        }
      } catch (e) {
        this.showSnackbarError();
        console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
      } finally {
        this.isSendData = false
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
      }
    },

    /**
     * Function that hide the modal "check" form
     * @author Xavier de Juan
     * @return boolean
     */
    hideDialog() {
      this.dialog = false;
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
      this.snackbar.text = "Error"
      this.snackbar.color = "red"
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
      this.snackbar.text = "Ok"
      this.snackbar.color = "green"
      this.snackbar.flag = true
    },

  }
};
</script>