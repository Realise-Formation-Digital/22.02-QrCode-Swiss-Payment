import XmlLibrary from "@/libs/XmlLibrary";
import {
    XML_QRR,
    XML_PRTRY,
    XML_NTRY_REF,
    XML_ULTIMATE_DEBTOR,
    XML_CREDITOR_ACCOUNT,
    XML_ISR_REFERENCE,
    XML_DIVALTO_ACCOUNT, XML_IBAN
} from "@/libs/consts";

/**
 * @class
 * @classdesc Service for XML Files
 * @author Marco Tribuzio
 * @author Xavier De Juan
 */
class XmlService {

    static async fixXMLDivalto(xmlFile) {
        try {
            console.log('[XmlService][fixXMLDivalto] Fixing xml coming from user input with params', xmlFile)
            //first parse the field coming from input
            const xmlRawDoc = await XmlLibrary.getXMLDoc(xmlFile)

            // second step remove useless tag
            // remove ultimateDebtorAccount
            const ultimaDebtorTagList = xmlRawDoc.getElementsByTagName(XML_ULTIMATE_DEBTOR)

            for (let itemUltimateDebtorTag of Array.from(ultimaDebtorTagList)) {
                itemUltimateDebtorTag.parentNode.removeChild(itemUltimateDebtorTag)
            }

            // remove creditorAccount
            const creditorTagList = xmlRawDoc.getElementsByTagName(XML_CREDITOR_ACCOUNT)
            for (let itemCreditorTag of Array.from(creditorTagList)) {
                itemCreditorTag.parentNode.removeChild(itemCreditorTag)
            }
            // change value qrr to ISR REFERENCE
            const prtryTagList = xmlRawDoc.getElementsByTagName(XML_PRTRY)
            for (let itemPrtryTag of prtryTagList) {
                if (itemPrtryTag && itemPrtryTag.childNodes[0] && itemPrtryTag.childNodes[0].nodeValue && itemPrtryTag.childNodes[0].nodeValue === XML_QRR) itemPrtryTag.childNodes[0].nodeValue = XML_ISR_REFERENCE
            }

            const ntryTagList = xmlRawDoc.getElementsByTagName(XML_NTRY_REF)
            for (let itemNtryTag of ntryTagList) {
                if (itemNtryTag && itemNtryTag.childNodes[0] && itemNtryTag.childNodes[0].nodeValue && itemNtryTag.childNodes[0].nodeValue === XML_IBAN) itemNtryTag.childNodes[0].nodeValue = XML_DIVALTO_ACCOUNT
            }

            return xmlRawDoc
        } catch (e) {
            console.error('[XmlService][fixXMLDivalto] An error occurred when fixing xml coming from user input', e)
            throw new Error('[XmlService][fixXMLDivalto] An error occurred when fixing xml coming from user input')
        }
    }

}

export default XmlService