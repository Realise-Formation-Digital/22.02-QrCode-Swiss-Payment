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
        Home
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
        Créer une facture
      </span>
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