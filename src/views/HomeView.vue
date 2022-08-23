<template>
  <div>
    <v-row>
      <v-col>

        <v-btn class="ma-10" outlined color="indigo" to="csv" x-large rounded elevation="10">
          <v-icon>mdi-file-delimited-outline</v-icon>
          Importer une facture
        </v-btn>

        <v-btn class="ma-10" outlined color="indigo" to="form-qr" x-large rounded elevation="10">
          <v-icon>mdi-qrcode</v-icon>
          Créer une facture
        </v-btn>

      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  },
  data: () => ({
    alignments: [
      "center",
    ]
  })
}
</script>
