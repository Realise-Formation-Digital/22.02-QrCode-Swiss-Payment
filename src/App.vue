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

import NavBar from "@/components/Navbar";
import FooTer from "@/components/Footer.vue";
export default {
  name: 'App',
  components: {NavBar, FooTer},
  data: () => ({
  }),
};
</script>