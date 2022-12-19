<template>
    <v-snackbar v-model="snackbar.flag" ref="snackbar" :color="snackbar.color" center="true" :top="true">
        {{ snackbar.text }}
    </v-snackbar>
</template>
<script>
import { SUCCESSCODE } from '../libs/consts.js'
import { ERRORCODE } from '../libs/consts.js'

export default {
    name: 'Snack-Bar',
    data: () => ({
        snackbar: {
            flag: false,
            color: "",
            text: "",
        }
    }),
    methods: {
        /**
         * Boolean changing the message of the snackbar depending on the file that calls it.
         * @param {*} codeSuccess
         * @return {boolean}
         * @author - Marco Tribuzio
         * @author - Xavier de Juan
         */
        handleSuccess(codeSuccess) {
            console.log("CodeSuccess", SUCCESSCODE)
            this.snackbar.color = "success"
            switch (codeSuccess) {
                case SUCCESSCODE.QRCODEDOWNLOADED: {
                    this.snackbar.text = "Code QR téléchargé avec succès"
                    break
                }
                case SUCCESSCODE.XMLCONVERTED: {
                    this.snackbar.text = "Conversion effectuée avec succès"
                    break
                }
            }
            this.snackbar.flag = true
        },
        /**
         * Boolean changing the message of the snackbar depending on the file that calls it.
         * @param {*} codeError
         * @return {boolean}
         * @author - Marco Tribuzio
         * @author - Xavier de Juan
         */
        handleError(codeError) {
            console.log("codeError", ERRORCODE)
            this.snackbar.color = "error"
            switch (codeError) {
                case ERRORCODE.ERRORQRCODEDOWNLOAD: {
                    this.snackbar.text = "Echec du télechargement du code QR"
                    break
                }
                case ERRORCODE.ERRORCONVERT: {
                    this.snackbar.text = "Echec lors de la conversion"
                    break
                }
            }
            this.snackbar.flag = true
        }
    }
}
</script>
<style>

</style>