import Papa from 'papaparse'
/**
 * @class
 * @classdesc - Wrapper of library papaparse
 * @deprecated
 */
class ParseCsv {
    config = {
        download: true,
        header: true,
    }
    /**
     * @deprecated
     * @param {*} csvFile 
     * @returns {promise - object}
     * @author - Xavier de Juan
     */
    static csvToJson(csvFile) {
        return new Promise((resolve) => {
            Papa.parse(csvFile, {
                header: true,
                complete: (result) => {
                    resolve(result.data)
                }
            })
        })
    }s
}

export default ParseCsv