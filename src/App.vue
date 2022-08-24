<template>
  <v-app>
  <NavBar/>
    
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "@/components/Navbar";
export default {
  name: 'App',
  components: {NavBar},
  data: () => ({
    //
  }),
};
</script>
