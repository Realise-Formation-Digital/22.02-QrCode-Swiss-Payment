<template>
  <v-app>
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
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="rue"
        :counter="5"
        :rules="rueRules"
        label="Rue"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

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


export default {
  name: "FormQr",

  data: () => ({
    return: {
      iban:"",
      name:"",
      rue:"",
      email:"",
    },

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
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
    rue: "",
    rueRules: [
      (v) => !!v || "Address is required",
      (v) => (v && v.length <= 5) || "Name must be less than 5 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    checkbox: false,
    
    
    
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      console.log("name")
      // var data = '{ "Iban":"' + this.iban + '" , "Name":"' + this.name + '", "Rue":"' + this.rue + '" , "Email":"' + this.email + '"   }';
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
