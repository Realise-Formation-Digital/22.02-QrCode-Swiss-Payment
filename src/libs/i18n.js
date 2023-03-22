import i18next from "i18next";
import de from "@/locales/de.json";
import en from "@/locales/en.json";
import es from '@/locales/es.json';
import fr from "@/locales/fr.json";
import it from "@/locales/it.json";
import pt from "@/locales/pt.json";
/**
 * Function that initialize i18next
 * @returns {Promise}
 * @author Xavier de Juan
 */
class Traductor {
    static async initTraductor() {
        await i18next.init({
            lng: navigator.language, // Prends le langage du navigateur
            fallbackLng: 'en',
            debug: true,
            resources: {
                de: de,
                en: en,
                es: es,
                fr: fr,
                it: it,
                pt: pt,
            }
        })
    }
    /**
     * Function that change langage
     * @param {*} lng 
     * @returns {Promise}
     * @author - Xavier de Juan 
     */
    static async changeLanguage(lng) {
        await i18next.changeLanguage(lng);
        return lng
    }
    /**
     * Function that baaaahhhh!!! Pfffff!!! beuuuuuuu?? make the traduction?
     * @param {*} key 
     * @returns {string}
     * @author - Xavier de Juan
     */
    static traduction(key) {
        return i18next.t(key)
    }
}

export default Traductor