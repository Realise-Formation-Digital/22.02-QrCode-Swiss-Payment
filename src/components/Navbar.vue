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
    <v-btn v-show="$route.path !== '/'" to="/form-qr" text plain>
      <span class="mr-2 hide">
        <v-icon>mdi-qrcode</v-icon>
        {{ this.traduis('navbar.boutonFacture') }}
        <!-- Créer une facture -->
      </span>
    </v-btn>

    <v-btn v-show="$route.path !=='/'" to="/xml" text plain>
      <span class="mr-2 hide">
        <v-icon>mdi-xml</v-icon>
        Convertir pour Divalto
      </span>
    </v-btn>
    <v-btn to="/Info" text plain icon>
        <v-icon>info</v-icon>
    </v-btn>
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
      value: "Français"
    }, {
      key: "en",
      value: "English"
    }, {
      key : "es",
      value: "Español"
    }],
    navbarColor: process.env.VUE_APP_NAVBAR_COLOR,
  }),
  methods: {
    /**
     * Language selection function in the dropDown
     * @param {*} langSelect
     * @returns {????}
     * @author - Xavier de Juan
     */
    traductSelect(langSelect) {
        Traductor.changeLanguage(langSelect)
        return this.langSelect
    }
  },
}
</script>
<style scoped>
</style>