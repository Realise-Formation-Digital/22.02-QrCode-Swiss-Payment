<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <FooterBar></FooterBar>
  </v-app>
</template>

<script>

import NavBar from "@/components/Navbar";
import FooterBar from "@/components/FooterBar.vue";
export default {
  name: 'App',
  components: {NavBar, FooterBar},
  data: () => ({
  }),
  /**
   * Exemple pour l'utilisation de .env
   */
  mounted(){
    console.log("ciao",process.env.VUE_APP_NOT_SECRET_CODE, process.env.NODE_ENV)
  }
};
</script>