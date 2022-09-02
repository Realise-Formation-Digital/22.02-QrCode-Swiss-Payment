<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <footer></footer>
  </v-app>
</template>

<script>

import NavBar from "@/components/Navbar";
import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components: {NavBar, Footer},
  data: () => ({
    //
  }),
};
</script>