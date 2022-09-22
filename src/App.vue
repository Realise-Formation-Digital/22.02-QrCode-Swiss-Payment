<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <fooTer></fooTer>
  </v-app>
</template>

<script>

import NavBar from "@/components/Navbar.vue";
import FooTer from "@/components/Footer.vue";
import Traductor from "@/libs/i18n.js"

export default {
  name: 'App',
  components: {NavBar, FooTer},
  data: () => ({
  }),
  async mounted(){
    await Traductor.initTraducteur()
  }
};
</script>