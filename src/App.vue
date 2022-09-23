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

import NavBar from "@/components/Navbar.vue";
import FooterBar from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {NavBar, FooterBar}
};
</script>