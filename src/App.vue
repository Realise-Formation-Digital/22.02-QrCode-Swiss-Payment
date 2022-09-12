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
export default {
  name: 'App',
  components: {NavBar, FooTer},
  data: () => ({
  }),
  mounted(){
    console.log("ciao",process.env.VUE_APP_NOT_SECRET_CODE, process.env.NODE_ENV)
  }
};
</script>