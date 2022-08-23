<template>
  <v-app-bar app color="dark" dark elevation="8">
    <div class="d-flex align-center">
      <v-img alt="Vuetify Logo" class="shrink mr-10" contain src="@/assets/logo_realise.svg" width="150" />
    </div>

    <v-btn to="/" text plain x-large>
      <span class="mr-1">
        <v-icon>mdi-home</v-icon>
        Home
      </span>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn to="/csv" text plain>
      <span class="mr-2 hide">
        <v-icon>mdi-file-delimited-outline</v-icon>
        Importer un fichier
      </span>

    </v-btn>
    <v-btn to="/form-qr" text plain>
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
}
</script>

<style scoped>
.hide {
  display:visible;
}
</style>