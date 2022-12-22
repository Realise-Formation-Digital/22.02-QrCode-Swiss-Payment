import Traductor from "@/libs/i18n.js"

const traductionMixin = {
    created() {
    },
    /**
     * function that call the traduction function in Traductor class
     * @returns {string}
     * @author - xavier de Juan
     */
    methods: {
        traduis(key) {
            return Traductor.traduction(key)
        }
    }
}

export {
    traductionMixin
}