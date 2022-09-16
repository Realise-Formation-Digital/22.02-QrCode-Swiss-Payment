<template>
    <v-row>
        <v-col>
            {{ txtHtml }}
        </v-col>
    </v-row>
</template>
<script>
import ApiService from "@/services/apiService.js"

export default {
    name: "Info-View",
    data: {
        txtHtml: null
    },
    method: {
        async markServiceRequest() {
            try {
                console.log("reussi Sercvice request markdown")
                this.txtHtml = await ApiService.axioRequ()
            } catch (e) {
            }
        }
    }
}
</script>