<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title :class="footerColor">
        <strong class="subheading">Version 1.0.1</strong>

        <v-spacer></v-spacer>

        <v-btn class="mx-4" dark icon @click="openSiteRealise()">
          <v-icon size="200%">
            mdi-web
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        Made with
        <v-icon size="100%">
          mdi-heart
        </v-icon>
        by<strong> Marco Tribuzio, <strong>Bachir Aouad</strong></strong> and <strong>Xavier de Juan</strong> - {{ new
        Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Foo-ter",
  data: () => ({
    footerColor: process.env.VUE_APP_FOOTER_COLOR,
  }),
  methods: {
    openSiteRealise(){
      window.open('https://realise.ch','_blank')
    }
  }
}
</script>

<style>
.realiseTheme {
  background-image: linear-gradient(90deg, #003da5, #41b6e6, #97d700);
  height: 4em;
}

.subheading {
  font-size: 100%;
}
</style>