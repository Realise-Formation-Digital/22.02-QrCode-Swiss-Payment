<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="realiseTheme">
        <strong class="subheading">Version 1.0.1</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="200%">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        <strong>Developped by Marco Tribuzio and Xavier de Juan</strong> - {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    name: "Foo-ter",
    data: () => ({
      icons: [
        'mdi-linkedin',
        'mdi-facebook',
        // 'mdi-twitter',
        // 'mdi-instagram',
      ],
    }),
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