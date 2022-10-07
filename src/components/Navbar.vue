<template>
  <v-app-bar app :color="navbarColor" dark elevation="8">
    <div class="d-flex align-center">
      <v-img alt="Vuetify Logo" class="shrink mr-10" contain :src="getImgUrl" width="150" />
      <!--:src="navLogo"-->
    </div>

    <!-- Navbar buttons -->
    <v-btn to="/" text plain x-large>
      <span class="mr-1">
        <v-icon>mdi-home</v-icon>
        {{ this.traduis('navbar.boutonAccueil') }}
        <!-- Page d'accueil -->
      </span>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- ATTENTION BOUTON CACHE PROVISOIREMENT -->
    <!-- <v-btn v-show="$route.path !=='/'" to="/csv" text plain>
      <span class="mr-2 hide">
        <v-icon>mdi-file-delimited-outline</v-icon>
        Importer un fichier
      </span>
    </v-btn> -->
    <v-btn v-show="$route.path !== '/'" to="/form-qr" text plain>
      <span class="mr-2 hide">
        <v-icon>mdi-qrcode</v-icon>
        {{ this.traduis('navbar.boutonFacture') }}
        <!-- Créer une facture -->
      </span>
    </v-btn>
    <v-col class="d-flex" cols="2">
      <v-select :items="langSelect" item-text="value" item-value="key" @change="traductSelect"></v-select>
    </v-col>
  </v-app-bar>
</template>

<script>
import { traductionMixin } from "@/mixins/traductionMixin.js";
import Traductor from '@/libs/i18n.js'

export default {
  name: "Nav-bar",
  mixins: [traductionMixin],
  computed: {
    getImgUrl() {
      return require(process.env.VUE_APP_NAVBAR_LOGO);
    }
  },
  data: () => ({
    langSelect: [{
      key :"fr",
      value: "Francaise"
    }, {
      key: "en",
      value: "English"
    }, {
      key : "es",
      value: "Espaniol"
    }],
    navbarColor: process.env.VUE_APP_NAVBAR_COLOR,
  }),
  methods: {
    traductSelect(key) {
        Traductor.changeLanguage(key)
    }
  }
}
</script>

<style scoped>

</style>