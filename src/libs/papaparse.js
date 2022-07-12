/**
 * @class
 * @classdesc - Wrapper of library papaparse
 */
class ParseCsv {

    config = {
        
    }

    static csvToJson(csvFile) {
        return this.$papa.parse(csvFile, config)
    }

}

export default ParseCsv