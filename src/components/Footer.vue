<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="realiseTheme">
        <strong class="subheading">Version {{ version }}</strong>
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
        by
        <v-tooltip :max-width="maxWidthTooltip" top>
          <template v-slot:activator="{ on, attrs }">
            <strong v-bind="attrs" v-on="on" @click="openMarcoLinkedin()">Marco Tribuzio</strong>
          </template>
          <span>Lien Linkedin</span>
        </v-tooltip>
        ,
        <v-tooltip :max-width="maxWidthTooltip" top>
          <template v-slot:activator="{ on, attrs }">
            <strong v-bind="attrs" v-on="on">Bachir Aouad</strong>
          </template>
          <span>Pas de compte Linkedin</span>
        </v-tooltip>
        and
        <v-tooltip :max-width="maxWidthTooltip" top>
          <template v-slot:activator="{ on, attrs }">
            <strong v-bind="attrs" v-on="on" @click="openXavierLinkedin()">Xavier de Juan</strong>
          </template>
          <span>Lien Linkedin</span>
        </v-tooltip>
        - {{ new Date().getFullYear()
        }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  name: "Footer-bar",
  data: () => ({
    maxWidthTooltip: 300,
    footerColor: process.env.VUE_APP_FOOTER_COLOR,
    version: process.env.VUE_APP_VERSION
  }),
  methods: {
    /**
     * Link to the realise site and Linkedin
     * @returns {links}
     * @author  - Marco Tribuzio
     * @author  - Xavier de Juan
     */
    openSiteRealise() {
      window.open(process.env.VUE_APP_FOOTER_ICONS, '_blank')
    },
    openMarcoLinkedin() {
      window.open('https://www.linkedin.com/in/marcotribuz/')
    },
    openBachirLinkedin() {
      window.open('')
    },
    openXavierLinkedin() {
      window.open('https://www.linkedin.com/in/xavier-de-juan-257721146')
    }
  }
}
</script>
<style>
.realiseTheme {
  background-image: linear-gradient(90deg, #003da5, #41b6e6, #97d700);
  height: 3em;
}

.subheading {
  font-size: 100%;
}
</style>