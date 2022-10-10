import i18next from "i18next";

import en from "@/locales/en.json";
import es from '@/locales/es.json';
import fr from "@/locales/fr.json";

class Traductor {

    static async initTraductor() {
        await i18next.init({
            lng: 'en', // if you're using a language detector, do not define the lng option
            debug: true,
            resources: {
                en: en,
                fr: fr,
                es: es
            }
        })
    }

    static async changeLanguage(resources) {
        console.log("change Langage", resources)
        console.log("change Langage", typeof (resources))
        await i18next.changeLanguage(resources)
        console.log("i18", i18next)
        console.log("i18", i18next.t)
    }

    static traduction(key) {
        return i18next.t(key)
    }
}

export default Traductor