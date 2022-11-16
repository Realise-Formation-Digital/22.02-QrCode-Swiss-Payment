<template>
    <v-snackbar v-model="snackbar.flag" ref="snackbar" :color="snackbar.color" :right="true" :top="true">
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
            color: null,
            text: null
        }
    }),
    props: {
        // flag: Boolean,
        // text: String,
        // color: Boolean,

        // flag: { type: Boolean, default: false, require: true },
        // text: { type: String, default: null, require: true },
        // color: { type: Boolean, default: null, require: true },
    },
    // data: () => ({
    //     snackbar: { // API merge file receipt status message
    //         flag: false,
    //         text: null,
    //         color: null,
    //     },
    // }),
    methods: {
        /**
    * Function that show the snackbar when QR code is not received
    * @author Xavier de Juan
    * @return boolean
    */
        // showSnackbarError() {
        //     this.snackbar.text = "Une erreur est survenue lors du téléchargement du code QR"
        //     this.snackbar.color = "error"
        //     this.snackbar.flag = true
        // },
        /**
         * Function that hide the snackbar
         * @author Xavier de Juan
         * @return boolean
         */
        // hideSnackBar() {
        //     this.snackbar.flag = false
        //     this.snackbar.text = null
        //     this.snackbar.color = null
        // },
        /**
         * Function that show the snackbar when QR code is received
         * @author Xavier de Juan
         * @return boolean
         */
        // showSnackbarSuccess() {
        //     console.log("CALLED")
        //     this.snackbar.text = "Code QR téléchargé avec succès."
        //     this.snackbar.color = "success"
        //     this.snackbar.flag = true
        // },

        handleSuccess(codeSuccess) {
            console.log("CodeSuccess", SUCCESSCODE)
            this.snackbar.color = "success"

            switch (codeSuccess) {
                case SUCCESSCODE.QRCODEDOWNLOADED: {
                    this.snackbar.text = "Code QR téléchargé avec succès"
                    break
                }
                case SUCCESSCODE.PDFUPLOADED: {
                    this.snackbar.text = "Uploaded Done! :)"
                    break
                }
            }
            this.snackbar.flag = true
        },
        handleError(codeError) {
            console.log("codeError", ERRORCODE)
            this.snackbar.color = "alert"

            switch (codeError) {
                case ERRORCODE.ERRORQRCODEDOWNLOAD: {
                    this.snack.text = "Echec du télechargement du code QR"
                    break
                }
                case ERRORCODE.ERRORPDFUPLOAD: {
                    this.snackbar.text = "Echec lors de l'upload"
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