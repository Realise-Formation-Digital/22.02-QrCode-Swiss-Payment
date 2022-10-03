const {XMLParser} = require('fast-xml-parser');


class XmlParser {
    static parser (xmltext) {
        const options = {
            ignoreAttributes : false
        };
        
        const parser = new XMLParser(options);
        let jsonObj = parser.parse(xmltext);
        console.log('ciao',jsonObj)
    }
}

export default XmlParser