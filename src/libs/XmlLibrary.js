class XmlLibrary {
    static getPrTry() {

    }
    static getXMLDoc(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(reader.result, "text/xml");
                resolve(xmlDoc)
            };
            reader.onerror = error => reject(error);
        });
    }
    static setPrTry(xmlDoc) {
        const test = xmlDoc.getElementsByTagName("CdOrPrtry")
        console.log('ciao', test[0].childNodes[1].childNodes[0].nodeValue)
        console.log('test', xmlDoc)
    }
    static rmvTag(xmlDoc) {
        console.log("xmlDoc", xmlDoc)
        let xmlToRmv = xmlDoc.getElementsByTagName("UltmtDbtr")[0]
        console.log("xmlToRmv", xmlToRmv)
        xmlToRmv.parentNode.removeChild(xmlToRmv)
        for (let i = 0; i < xmlToRmv.length; i++) {
            while (xmlToRmv[i].attributes.length > 0) {
                let attnode = xmlToRmv[i].attributes[0];
                xmlToRmv = xmlToRmv[i].removeAttributeNode(attnode);
            }
        }
    }
    static rplcTag(xmlDoc) {
        const xmlToRplc = xmlDoc.getElementsByTagName("Prtry")
        console.log("xlmRplc", xmlToRplc)
        for (let i = 0; i < xmlToRplc.length; i++) {
            console.log("arrayRplc", xmlToRplc)
            console.log("compare", xmlToRplc == "QRR")
            console.log("compare balise", xmlToRplc == "Prtry")
            // xmlToRplc[""] == "QRR" ? xmlToRplc.replace("QRR", "ISR REFERENCE") : ""
            // console.log("Remplacé?", xmlToRplc)
            xmlToRplc.textContent = "ISR REFERENCE"
        }
    }
}


export default XmlLibrary