import XmlLibrary from "@/libs/XmlLibrary";
import {
    XML_QRR,
    XML_PRTRY,
    XML_NTRY_REF,
    XML_ULTIMATE_DEBTOR,
    XML_CREDITOR_ACCOUNT,
    XML_ISR_REFERENCE,
    XML_DIVALTO_ACCOUNT, XML_IBAN, STOREMUTATIONS
} from "@/libs/consts";
const storeXml = {
    namespaced: true,
    state: {
        rawXmlFile: null
    },
    getters: {
        getRawXmlFile: (state) => state.rawXmlFile
    },
    mutations: {
        mutRawXmlFile(state, payload) {
            state.rawXmlFile = payload.xmlFile
        }
    },
    actions: {
        /**
         * Function that fix the xml from user input 
         * @param {*} param0 
         * @param {*} payload 
         * @returns {object}
         * @author xavier de Juan
         */
        async actRawXmlFile({ commit }, payload) {
            console.log('[store][storeXml][actRawXmlFile] Fixing xml from user input with param', payload)
            try {
                // Parse the file imported
                const rawXmlDoc = await XmlLibrary.getXMLDoc(payload)
                // Remove the ultimate debtor account
                const ultimaDebtorTagList = rawXmlDoc.getElementsByTagName(XML_ULTIMATE_DEBTOR)
                for (let ultimaDebtorTagListItem of Array.from(ultimaDebtorTagList)) {
                    ultimaDebtorTagListItem.parentNode.removeChild(ultimaDebtorTagListItem)
                }
                // Remove creditor account
                const creditorAccountList = rawXmlDoc.getElementsByTagName(XML_CREDITOR_ACCOUNT)
                for (let creditorAccountListItem of Array.from(creditorAccountList)) {
                    creditorAccountListItem.parentNode.removeChild(creditorAccountListItem)
                }
                // Change value qrr to ISR REFERENCE
                const PrtryTagList = rawXmlDoc.getElementsByTagName(XML_PRTRY)
                for (let PrtryTagItem of PrtryTagList) {
                    if (PrtryTagItem && PrtryTagItem.childNodes[0] && PrtryTagItem.childNodes[0].nodeValue && PrtryTagItem.childNodes[0].nodeValue === XML_QRR) PrtryTagItem.childNodes[0].nodeValue === XML_ISR_REFERENCE
                }
                // Change the value Xml iban to Divalto account
                const ntryTagList = rawXmlDoc.getElementsByTagName(XML_NTRY_REF)
                for (let ntryTagItem of ntryTagList) {
                    if (ntryTagItem && ntryTagItem.childNodes[0] && ntryTagItem.childNodes[0].nodeValue && ntryTagItem.childNodes[0].nodeValue === XML_IBAN) ntryTagItem.childNodes[0].nodeValue === XML_DIVALTO_ACCOUNT
                }
                commit(STOREMUTATIONS.RAWXMLFILE, { xmlFile: rawXmlDoc })
            } catch (e) {
                console.error('[store][storeXml][actRawXmlFile] An error occured when fixing xml coming from user input', e)
                throw new Error
            }
        }
    }
}
export default storeXml