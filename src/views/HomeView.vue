<template>
  <v-row align="center" justify="center">
    <v-col></v-col>

    <!--Buttons in the home page. -->
    <v-col align="center">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" outlined color="primary" to="form-qr"
            x-large elevation="10">
            <v-icon left>mdi-qrcode</v-icon>
            {{ traduis('homepage.facture') }}
          </v-btn>
        </template>
      </v-hover>
    </v-col>

    <v-col align="center">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-btn :class="`elevation-${hover ? 5 : 3}`" class="transition-swing" outlined color="primary" to="xml"
            x-large>
            <v-icon left>mdi-xml</v-icon>
            Convertir pour Divalto
          </v-btn>
        </template>
      </v-hover>
    </v-col>
    <v-col></v-col>
  </v-row>
</template>
<script>
import { traductionMixin } from "@/mixins/traductionMixin.js"
export default {
  name: 'HomeView',
  mixins: [traductionMixin],
  data: () => ({
    justify: [
      'space-around',
    ],
  }),
}
</script>
