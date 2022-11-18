<template>
    <v-row>
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
// import { SHOWLOADPOPUP } from '../libs/consts.js'
// import { HIDELOADPOPUP } from '../libs/consts.js'

export default {
    name: "loading-PopUp",
    data: () => ({
        loadingPopUp: false,// Boolean pop-up loading modal until receipt snackbar
    }),
    watch: {
        /**
         * activates the modal until the value is equal.
         * @param {*} val
         * @author Xavier de Juan
         */
        loadingPopUp(val) {
            if (!val) return
        },
    },
    methods: {
        handleLoadPopUpShow() {
            this.loadingPopUp = true
        },
        handleLoadPopUpHide() {
            this.loadingPopUp = false
        }
    },
}
</script>
