<template>
    <v-row>
        <!-- Pop-up until the QR code is received or an error -->
        <v-dialog v-model="loadingPopUp" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    Veuillez patienter, en attente de réception
                    <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    name: "loading-PopUp",
    data: () => ({
        loadingPopUp: false,// Boolean pop-up loading modal until receipt snackbar
    }),
    watch: {
        /**
         * activates the modal until the value is equal.
         * @param {*} val
         * @returns {boolean}
         * @author - Xavier de Juan
         */
        loadingPopUp(val) {
            if (!val) return
        },
    },
    methods: {
        /**
    * Function that show the loading pop-up during API's await
    * @author Xavier de Juan
    */
        showLoadingPopUp() {
            this.loadingPopUp = true
        },
        /**
     * Function that hide the loading pop-up
     * @author Xavier de Juan
     */
        hideLoadingPopUp() {
            this.loadingPopUp = false
        }
    },
}
</script>
