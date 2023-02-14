<template>
  <v-row>
    <v-col>
      <div v-html="txtMrkDwn" />
    </v-col>
  </v-row>
</template>
<script>
// import ApiService from "@/services/apiService.js"

export default {
  name: "Info-View",
  data: () => ({
    txtHtml: null
  }),
  /**
   * Function that calls a query in Markdown
   * @return {Promise<String>}
   * @author Xavier de Juan
   */
  // async mounted() {
  //   try {
  //     console.log("Success Service request markdown")
  //     this.txtHtml = await ApiService.axioRequ()
  computed: {
    txtMrkDwn() {
      return this.$store.getters['storeMarkDown/getMarkDown']
    }
  },
  async mounted() {
    try {
      console.log("success request markdown")
      // this.txtHtml = await ApiService.axioRequ()
      await this.$store.dispatch('storeMarkDown/markDown')
    } catch (e) {
      throw new Error(e)
    }
  },
}
</script>