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
            label="NPA"
            required
        ></v-text-field>

        <v-text-field
            v-model="dplace"
            :rules="dplaceRules"
            label="Lieu"
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


export default {
  name: "FormQr",
  data: () => ({
    valid: false,
    return: {
      //variables pour le "le beneficiaire"
      iban: "",
      name: "",
      street: "",
      nrrue: "",
      npa: "",
      place: "",
      country: "",
      //Variables pour le "debiteur"
      dnom: "",
      dstreet: "",
      dnr: "",
      dnpa: "",
      dplace: "",
      dcountry: "",
      //Variables pour les "information sur le montant du paiement"
      amount: "",
      nrref: "",
      infosupp: "",
    },   
      //Validation pour "le débiteur"  
    dnom: "",
    dnomRules: [
      (v) => !!v || "Ce champ est obligatoire. (Vous ne pouvez pas le laisser vide)",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dstreet: "",
    dstreetRules: [
      (v) => !!v || "Ce champ est obligatoire. (Vous ne pouvez pas le laisser vide)",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dnr: "",
    dnrRules: [
      (v) => !!v || "Ce champ est obligatoire. (Vous ne pouvez pas le laisser vide)",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dnpa: "",
    dnpaRules: [
      (v) => !!v || "Ce champ est obligatoire. (Vous ne pouvez pas le laisser vide)",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dplace: "",
    dplaceRules: [
      (v) => !!v || "Ce champ est obligatoire. (Vous ne pouvez pas le laisser vide)",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dcountry: "",
    dcountryRules: [
      (v) => !!v || "Ce champ est obligatoire. (Vous ne pouvez pas le laisser vide)",
      (v) => (v && v.length == 2) || "Le pays doit contenir 2 caractères.",
    ],
    //Validation pour "Information sur le montant du paiement"
    amount: "",
    amountRules: [
      (v) => !!v || "Le montant est obligatoire. (Vous ne pouvez pas le laisser vide)",
      (v) => (v && v.length <= 12) || "Le montant peut contenir 12 caractères au maximum.",
    ],
    nrref: "",
    nrrefRules: [
      (v) => !!v || "Le numéro de référence est obligatoire. (Vous ne pouvez pas le laisser vide)",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
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
              amount: this.amount,
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
