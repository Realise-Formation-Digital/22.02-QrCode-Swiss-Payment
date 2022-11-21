class XmlLibrary {
    static getPrTry() {
    }
    /**
     * 
     * @param {*} file 
     * @returns {promise}
     * @author Marco Tribuzio
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
     * 
     * @param {*} xmlDoc
     * @author Marco Tribuzio
     */
    static setPrTry(xmlDoc) {
        const test = xmlDoc.getElementsByTagName("CdOrPrtry")
        console.log('ciao', test[0].childNodes[1].childNodes[0].nodeValue)
        console.log('test', xmlDoc)
    }
    /**
     * function remove the tag UltmtDbtr from the xml file
     * @param {*} xmlDoc 
     * @return - void
     * @author Marco Tribuzio
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
     * Replace QRR by ISR REFERENCE
     * @param {*} xmlDoc
     * @return - void
     * @author Xavier de Juan
     */
    static rplcTag(xmlDoc) {
        const xmlToRplc = xmlDoc.getElementsByTagName("Prtry")
        for (let i = 0; i < xmlToRplc.length; i++) {
            xmlToRplc.textContent = "ISR REFERENCE"
        }
    }
}


export default XmlLibrary