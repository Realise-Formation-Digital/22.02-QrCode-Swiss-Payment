<template>
  <v-app-bar app :color="navbarColor" dark elevation="8">
    <div class="d-flex align-center">
      <v-img alt="Vuetify Logo" class="shrink mr-10" contain :src="getImgUrl" width="150" />
      <!--:src="navLogo"-->
    </div>

    <!-- Navbar buttons -->
    <v-btn to="/" text plain x-large>
        <v-icon left>mdi-home</v-icon>
        Home
    </v-btn>

    <v-spacer></v-spacer>

    <!-- ATTENTION BOUTON CACHE PROVISOIREMENT -->
    <v-btn v-show="$route.path !=='/'" to="/xml" text plain>
      <span class="mr-2 hide">
        <v-icon>mdi-xml</v-icon>
        Convertir pour Divalto
      </span>
    </v-btn>

    <!--
    <v-btn v-show="$route.path !=='/'" to="/csv" text plain>
      <span class="mr-2 hide">
        <v-icon>mdi-file-delimited-outline</v-icon>
        Importer un fichier
      </span>
    </v-btn> -->

    <v-btn v-show="$route.path !== '/'" to="/form-qr" text plain>
        <v-icon left>mdi-qrcode</v-icon>
        Créer une facture
    </v-btn>

    <v-btn to="/Info" text plain icon>
        <v-icon>info</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Nav-bar",
  computed: {
    getImgUrl() {
      return require(process.env.VUE_APP_NAVBAR_LOGO);
    }
  },
  data: () => ({
    navbarColor: process.env.VUE_APP_NAVBAR_COLOR
  })
}
</script>

<style scoped>
</style>