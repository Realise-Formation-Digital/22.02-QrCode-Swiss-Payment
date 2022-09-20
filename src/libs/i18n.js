import i18next from 'i18next';

class Traductor {

    static async initTraducteur () {
        i18next.init({
            lng:'en',
            ressources: {
                en: {
                    translation: {
                        key: 'hello world'
                    }
                }
            }
        })

        console.log(i18next.t('key'))
        // initialisation.init(option, callback)
        // return await i18next.
    }

    static traduction() {
    //   i18nex.t (valeur.clé)?
    // Découvrir la signification de t
    // Sous forme de tableau? (['unknown.key', 'my.key']) -> turn value for 'my.key' in set language /*Fonctionnement?
    }
}

export default Traductor

// Besoin de créer une nouvelle instance à l'extérieur? Je pense que non, la classe est en static.

// events
// onLanguageChanged
// i18next.on('languageChanged', function(lng) {})
// Gets fired when changeLanguage got called.

