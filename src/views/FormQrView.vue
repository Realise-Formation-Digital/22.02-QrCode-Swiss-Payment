<!-- Form to send to payload to get back a PDF/Qr file -->
<template>
  <v-row>
    <v-col lg="4" md="4" sm="12" xs="12">
      Here little descriptio what the user have to do :)
    </v-col>
    <v-col lg="8" md="8" sm="12" xs="12">
      <!-- <h1>Bénéficiaire</h1> -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- <v-text-field
            v-model="iban"
            :rules="ibanRules"
            label="IBAN"
            required
        ></v-text-field>

        <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nom"
            required
        ></v-text-field>

        <v-text-field
            v-model="street"
            :rules="streetRules"
            label="Rue"
            required
        ></v-text-field>

        <v-text-field
            v-model="nrstreet"
            :rules="nrstreetRules"
            label="N°"
            required
        ></v-text-field>

        <v-text-field
            v-model="npa"
            :rules="npaRules"
            label="NPA"
            required
        ></v-text-field>

        <v-text-field
            v-model="place"
            :rules="placeRules"
            label="Lieu"
            required
        ></v-text-field>

        <v-text-field
            v-model="country"
            :rules="countryRules"
            label="Pays"
            required
        ></v-text-field> -->

        <h1>Débiteur</h1>

        <v-text-field
            v-model="dnom"
            :rules="dnomRules"
            label="Nom"
            required
        ></v-text-field>

        <v-text-field
            v-model="dstreet"
            :rules="dstreetRules"
            label="Rue"
            required
        ></v-text-field>

        <v-text-field
            v-model="dnr"
            :rules="dnrRules"
            label="N°"
            required
        ></v-text-field>

        <v-text-field
            v-model="dnpa"
            :rules="dnpaRules"
            label="Code postal"
            required
        ></v-text-field>

        <v-text-field
            v-model="dplace"
            :rules="dplaceRules"
            label="Ville"
            required
        ></v-text-field>

        <v-text-field
            v-model="dcountry"
            :rules="dcountryRules"
            label="Pays"
            required
        ></v-text-field>

        <h1>Information sur le montant du paiement</h1>

        <v-text-field
            v-model="amount"
            :rules="amountRules"
            label="Montant"
            required
        ></v-text-field>

        <v-text-field
            v-model="nrref"
            :rules="nrrefRules"
            label="N° de référence"
            required
        ></v-text-field>

        <v-text-field
            v-model="infosupp"
            label="Informations supplémentaires"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
          Valider
        </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> Recommencer le formulaire</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable */
import axios from "axios"
import {BASE_URL, API_KEY} from "@/libs/consts";
import ApiService from "@/services/apiService.js";

const regex = /,/gm;
// const amount = ``;
const subst = `.`;

export default {
  name: "FormQr",
  data: () => ({
    valid: false,
    return: 
    {
      //variables pour le "le bénéficiaire"
      iban: "",
      name: "",
      street: "",
      nrrue: "",
      npa: "",
      place: "",
      country: "",

    // Variables pour le "débiteur"      
      dnom: "",
      dstreet: "",
      dnr: "",
      dnpa: "",
      dplace: "",
      dcountry: "",
      //Variables pour les "information sur le montant du paiement"
      amount: "",
      regex: /,/gm,
      subst: `.`,
      nrref: "",
      infosupp: "",
    },  
     
      //Validation pour "le débiteur"  
    dnom: "",
    dnomRules: [
      (v) => !!v || "Le nom est obligatoire.",
      (v) => (v && v.length <= 70) || "Le nom ne peut excéder 70 caractères.",
    ],
    dstreet: "",
    dstreetRules: [
      (v) => !!v || "La rue est obligatoire.",
      (v) => (v && v.length <= 70) || "La rue ne peut excéder 70 caractères.",
    ],
    dnr: "",
    dnrRules: [
      (v) => !!v || "Le n° de rue est obligatoire.",
      (v) => (v && v.length <= 16) || "Le n° de rue ne peut excéder 16 caractères.",
    ],
    dnpa: "",
    dnpaRules: [
      (v) => !!v || "Le n° postal est obligatoire.",
      (v) => (v && v.length <= 16) || "Le code postal ne peut excéder 16 caractères.",
    ],
    dplace: "",
    dplaceRules: [
      (v) => !!v || "La ville est obligatoire.",
      (v) => (v && v.length <= 35) || "La ville ne peut excéder 35 caractères.",
    ],
    dcountry: "",
    dcountryRules: [
      (v) => !!v || "Le pays est obligatoire et doit contenir 2 caractères. (ex:CH)",
      (v) => (v && v.length == 2) || "Le pays doit contenir 2 caractères. (ex:CH)",
    ],
    //Validation pour "Information sur le montant du paiement"
    amount: "",
    amountRules: [
      (v) => !!v || "Le montant est obligatoire.",
      (v) => (v && v.length <= 12) || "Le montant ne peut excéder 12 caractères",
    ],
    nrref: "",
    nrrefRules: [
      (v) => !!v || "Le numéro de référence est obligatoire.",
      (v) => (v && v.length <= 27) || "La référence ne peut excéder 27 caractères",
    ],
    infosupp: "",
    infosuppRules: [
      (v) => !!v || "Le numéro de référence est obligatoire.",
      (v) => (v && v.length <= 27) || "La référence ne peut excéder 27 caractères",
    ],
    select: null,
    checkbox: false,
  }),

  methods: {
    async validate() {
      try {
        const isValid = await this.$refs.form.validate();
        if (isValid) {
          const data = JSON.stringify({
            qrInvoice: {
              creditorInformation: {
                iban: this.iban,
                name: this.name,
                streetname: this.street,
                housenumber: this.nrsreet,
                postalcode: this.npa,
                city: this.place,
                country: this.country,
              }
            },
            ultimateDebtor: { //this is fix :) realise coordinates
              name: this.dnom,
              streetName: this.street,
              houseNumber: this.dnr,
              postalCode: this.dnpa,
              city: this.dplace,
              country: this.dcountry,
            },
            paymentAmountInformation: {
              amount: this.amount.replace(regex, subst),
            },
            paymentReference: {
              reference: this.nrref,
              addtionalReference: {
                unstructuredMessage: this.infosupp,
              }
            }
          });

          console.log(data)

          const response = await ApiService.sendSinglePayment(data)

          // set the blog type to final pdf
          const file = new Blob([response.data], { type: 'application/pdf' });

          // process to auto download it
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = "FileName" + new Date().getTime() + ".pdf";
          link.click();
        }
      } catch (e) {
        console.error('[Views][CsvView][sendCsvList] An error has occurred when send the csv list', e)
        //todo handle error
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  }
};
</script>
