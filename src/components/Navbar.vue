<template>
  <v-app-bar
      app
      color="grey"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo_realise.svg"
          width="80"
      />
    </div>
    <v-btn
        to="/"
        text
        plain
    >
      <span class="mr-2">Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn
        to="/csv"
        text
        plain
    >
      <span class="mr-2">Insert CSV</span>
      <v-icon>mdi-file-delimited-outline</v-icon>
    </v-btn>
    <v-btn
        to="/form-qr"
        text
        plain
    >
      <span class="mr-2">Insert Single Facture</span>
      <v-icon>mdi-qrcode</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "Nav-bar"
}
</script>

<style scoped>

</style>