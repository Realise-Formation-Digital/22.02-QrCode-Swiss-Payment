<template>
  <div class="container">
  <div class="pt-16 mt-16" >
      <v-col class="d-flex justify-center align-content-center">
        <div class="d-flex align-content-center flex-wrap" style="min-height:700px;">
          <!--Buttons in the home page. -->
          <!-- ATTENTION BOUTON CACHE PROVISOIREMENT -->
          <!-- <v-btn class="ma-10" outlined color="indigo" to="csv" x-large rounded elevation="10">
            <v-icon>mdi-file-delimited-outline</v-icon>
            Importer une facture
          </v-btn> -->

          <v-btn class="ma-10" outlined color="indigo" to="form-qr" x-large rounded elevation="10">
            <v-icon>mdi-qrcode</v-icon>
            Créer une facture
          </v-btn>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
}
</script>
