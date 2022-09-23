<template>
  <v-row>
    <v-col>
      <div v-html="txtHtml"/>
    </v-col>
  </v-row>
</template>
<script>
import ApiService from "@/services/apiService.js"

export default {
  name: "Info-View",
  data: () => ({
    txtHtml: null
  }),

  async mounted() {
    try {
      console.log("reussi Sercvice request markdown")
      this.txtHtml = await ApiService.axioRequ()
    } catch (e) {
      throw new Error(e)
    }
  },
  method: {
  }
}
</script>