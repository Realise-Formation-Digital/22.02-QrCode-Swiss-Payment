<template>
  <v-row>
    <v-col>
      <v-footer dark padless>
        <v-card class="flex" flat tile>
          <v-card-title class="realiseTheme">
            <strong class="subheading">Get connected with us on social networks!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "foo-ter",
}

</script>

<style>
.realiseTheme {
  background-image: linear-gradient(90deg, #003da5, #41b6e6, #97d700);
}
</style>