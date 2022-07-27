<!-- Form to send to payload to get back a PDF/Qr file -->
<template>
  <v-app>
    <h1>Bénéficiaire</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="iban"
        :counter="5"
        :rules="ibanRules"
        label="IBAN"
        required
      ></v-text-field>

      <v-text-field
        v-model="name"
        :counter="5"
        :rules="nameRules"
        label="Nom"
        required
      ></v-text-field>

      <v-text-field
        v-model="street"
        :counter="5"
        :rules="streetRules"
        label="Rue"
        required
      ></v-text-field>

      <v-divider></v-divider>

      <v-text-field
        v-model="nrstreet"
        :counter="5"
        :rules="nrstreetRules"
        label="N°"
        required
      ></v-text-field>

       <v-text-field
        v-model="npa"
        :counter="5"
        :rules="npaRules"
        label="NPA"
        required
      ></v-text-field>

      <v-spacer></v-spacer>

       <v-text-field
        v-model="place"
        :counter="5"
        :rules="placeRules"
        label="Lieu"
        required
      ></v-text-field>

       <v-text-field
        v-model="country"
        :counter="5"
        :rules="countryRules"
        label="Pays"
        required
      ></v-text-field>

      <h1>Débiteur</h1>

       <v-text-field
        v-model="dnom"
        :counter="5"
        :rules="dnomRules"
        label="Nom"
        required
      ></v-text-field>
      
      <v-text-field
        v-model="dstreet"
        :counter="5"
        :rules="dstreetRules"
        label="Rue"
        required
      ></v-text-field>

      <v-text-field
        v-model="dnr"
        :counter="5"
        :rules="dnrRules"
        label="N°"
        required
      ></v-text-field>

      <v-text-field
        v-model="dnpa"
        :counter="5"
        :rules="dnpaRules"
        label="NPA"
        required
      ></v-text-field>

      <v-text-field
        v-model="dplace"
        :counter="5"
        :rules="dplaceRules"
        label="Lieu"
        required
      ></v-text-field>

       <v-text-field
        v-model="dcountry"
        :counter="5"
        :rules="dcountryRules"
        label="Pays"
        required
      ></v-text-field>

      <h1>Information sur le montant du paiement</h1>

       <v-text-field
        v-model="amount"
        :counter="5"
        :rules="amountRules"
        label="Montant"
        required
      ></v-text-field>

       <v-text-field
        v-model="nrref"
        :counter="5"
        :rules="nrrefRules"
        label="N° de référence"
        required
      ></v-text-field>

      <v-text-field
        v-model="infosupp"
        :counter="5"
        :rules="infosuppRules"
        label="Informations supplémentaires"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
    </v-form>

  
  </v-app>
</template>

<script lang="ts">
import axios from "axios"


export default {
  name: "FormQr",

  data: () => ({
    return: {
      //variables pour le "le beneficiaire"
      iban:"",
      name:"",
      street:"",
      nrrue:"",
      npa:"",
      place:"",
      country:"",
      //Variables pour le "debiteur"
      dnom:"",
      dstreet:"",
      dnr:"",
      dnpa:"",
      dplace:"",
      dcountry:"",
      //Variables pour les "information sur le montant du paiement"
      amount:"",
      nrref:"",
      infosupp:"",

    },

    // Validation pour "le beneficiaire"
    valid: true,
    iban: "",
    ibanRules: [
      (v) => !!v || "IBAN is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 5) || "Name must be less than 5 characters",
    ],
    street: "",
    streetRules: [
      (v) => !!v || "Address is required",
      (v) => (v && v.length <= 5) || "Name must be less than 5 characters",
    ],
    nrstreet: "",
    nrstreetRules: [
      (v) => !!v || "Address is required",
      (v) => (v && v.length <= 5) || "Name must be less than 5 characters",
    ],
    npa: "",
    npaRules: [
      (v) => !!v || "NPA is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    place: "",
    placeRules: [
      (v) => !!v || "Lieu is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    country: "",
    countryRules: [
      (v) => !!v || "Country is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    //Validation pour "le debiteur"
    ],
    dnom: "",
    dnomRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dstreet: "",
    dstreetRules: [
      (v) => !!v || "Street is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dnr: "",
    dnrRules: [
      (v) => !!v || "Nr is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dnpa: "",
    dnpaRules: [
      (v) => !!v || "NPA is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dplace: "",
    dplaceRules: [
      (v) => !!v || "Place is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    dcountry: "",
    dcountryRules: [
      (v) => !!v || "country is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    //Validation pour "Information sur le montant du paiement"
    amount: "",
    amountRules: [
      (v) => !!v || "amount is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    nrref: "",
    nrrefRules: [
      (v) => !!v || "Nr reference is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    infosupp: "",
    infosuppRules: [
      (v) => !!v || "Info supp is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    select: null,
    checkbox: false,
    
    
    
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      const data = JSON.stringify({
        qrInvoice:{
          creditorInformation:{
      iban: this.iban ,
      name: this.name ,
      streetname: this.street,
      housenumber: this.nrsreet,
      postalcode:this.npa,
      city:this.place,
      country:this.country,
        }
      },
      ultimateDebtor:{
      name:this.dnom,
      streetName:this.street,
      houseNumber:this.dnr,
      postalCode:this.dnpa,
      city:this.dplace,
      country:this.dcountry,
      },
      paymentAmountInformation:{
      amount:this.amount,
      },
      paymentReference:{
      reference:this.nrref,
      addtionalReference:{
      unstructuredMessage:this.infosupp,
      }
    }
    })
    console.log(data)
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
};
</script>
