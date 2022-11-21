import Papa from 'papaparse'
/**
 * @class
 * @classdesc - Wrapper of library papaparse
 */
class ParseCsv {
    config = {
        download: true,
        header: true,
    }

    static csvToJson(csvFile) {
        return new Promise((resolve) => {
            Papa.parse(csvFile, {
                header: true,
                complete: (result) => {
                    console.log("papa", result)
                    resolve(result.data)
                }
            })
        })
    }
}

export default ParseCsv