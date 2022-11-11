<template>
  <v-row align="center" justify="center">
    <v-col></v-col>

    <!--Buttons in the home page. -->
    <v-col>
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-btn :class="`elevation-${hover ? 5 : 3}`" class="mx-auto pa-6 transition-swing" outlined color="primary"
            to="form-qr" x-large elevation="10">
            <v-icon left>mdi-qrcode</v-icon>
            <!-- {{ this.traduis('homepage.facture') }} ATTENTION TRADUCTION NE FONCTIONNE PAS POUR LE MOMENT!!!
            (FAIS DISPARAITRE LE BOUTON)-->
              Créer une facture
          </v-btn>
        </template>
      </v-hover>
    </v-col>

    <v-col>
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-btn :class="`elevation-${hover ? 5 : 3}`" class="mx-auto pa-6 transition-swing" outlined color="primary"
            to="xml" x-large>
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
