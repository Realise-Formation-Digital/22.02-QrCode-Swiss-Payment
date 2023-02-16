/**
 * @class
 * @classdesc - Wrapper of library fast-xml-parser
 */
class XmlLibrary {
    static getPrTry() {
    }
    /**
     * Function that analyse the file
     * @param {*} file 
     * @returns {object}
     * @author - Xavier de Juan
     */
    static getXMLDoc(file) {
        console.log("file", file)
        console.log("file", typeof file)
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(reader.result, "text/xml");
                console.log("xmlDoc", xmlDoc)
                console.log("xmlDoc", typeof xmlDoc)
                resolve(xmlDoc)
            };
            reader.onerror = error => reject(error);
        });
    }
    /**
     * function that sert à rien du tout
     * @deprecated
     * @param {*} xmlDoc 
     * @returns {void}
     * @author - Xavier de Juan
     */
    static setPrTry(xmlDoc) {
        const test = xmlDoc.getElementsByTagName("CdOrPrtry")
        console.log('ciao', test[0].childNodes[1].childNodes[0].nodeValue)
    }
    /**
     * function that remove UltmtDbtr from the file
     * @param {*} xmlDoc
     * @returns {void}
     * @author - Xavier de Juan
     */
    static rmvTag(xmlDoc) {
        let xmlToRmv = xmlDoc.getElementsByTagName("UltmtDbtr")[0]
        xmlToRmv.parentNode.removeChild(xmlToRmv)
        for (let i = 0; i < xmlToRmv.length; i++) {
            while (xmlToRmv[i].attributes.length > 0) {
                let attnode = xmlToRmv[i].attributes[0];
                xmlToRmv = xmlToRmv[i].removeAttributeNode(attnode);
            }
        }
    }
    /**
     * Function that replace QRR tag by ISR REFERENCE
     * @param {*} xmlDoc
     * @returns {void}
     * @author - Xavier de Juan 
     */
    static rplcTag(xmlDoc) {
        const xmlToRplc = xmlDoc.getElementsByTagName("Prtry")
        for (let i = 0; i < xmlToRplc.length; i++) {
            xmlToRplc.textContent = "ISR REFERENCE"
        }
    }
}


export default XmlLibrary