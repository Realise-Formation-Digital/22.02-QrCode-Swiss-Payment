import Traductor from "@/libs/i18n.js"

const traductionMixin = {
    created() {
    },
    methods: {
        traduis(key) {
            return Traductor.traduction(key)
        }
    }
}

export {
    traductionMixin
}