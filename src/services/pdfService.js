import Pdf from '@/libs/pdf.js'
import axios from "axios";

/**
 * @class
 * @classdesc
 */
class PdfService {

    /**
     * Function that calls the functions in the pdf class in the library
     * @param {*} file 
     * @returns - promise
     * @author Xavier de Juan
     */
    static async callPdfLibrary(file) {
        console.log("[service][pdfService][callPdfLibrary] pdf loaded and saved", file)
        try {
            const pdfFile = await Pdf.pdfLoad(file)
            const pages = Pdf.getPdfPages(pdfFile)
            Pdf.drawRectangle(pages)
            return await Pdf.savePdf(pdfFile)
        } catch (e) {
            console.error("[service][pdfService][callPdfLibrary] Error loading and saving pdf", e)
            throw new Error
        }
    }

    /**
     * Function that sends the pdf to a nodejs server to unlock the metadata
     * @param {*} pdf
     * @returns promise
     * @author Xavier de Juan
     */
    static async unlockPdf(pdf) {
        try {
            console.log("[Service][PdfService][mergeFiles] Unlock pdf", pdf)
            const pdfToUnlock = new FormData()
            pdfToUnlock.append('pdf', pdf)

            const response = await axios.post(process.env.VUE_APP_PDFUNLOCK_URL, pdfToUnlock, {
                  responseType: "blob",
                  headers: {
                      'Content-Type': 'application/json',
                      'accept': 'application/pdf',
                      'Accept-Language': 'fr'
                  }
              }
            )
            if (response.status !== 200) throw Error('API merge Error')
            return response
        } catch (e) {
            console.error("[Service][PdfService][mergeFiles] An error has occurred when trying to unlock pdf")
            throw new Error(e)
        }
    }

    static async readPdf(pdf){
        try {
            console.log("[Service][PdfService][readPdf] Reading pdf with params", pdf)
            const pdfToRead = new FormData()
            pdfToRead.append('pdf', pdf)

            const response = await axios.post(process.env.VUE_APP_PDFREAD_URL, pdfToRead, {
                  responseType: "application/json",
                  headers: {
                      'Content-Type': 'application/json',
                      'accept': 'application/pdf',
                      'Accept-Language': 'fr'
                  }
              }
            )
            if (response.status !== 200) throw Error('API merge Error')
            return response.data
        }catch (e) {
            console.error("[Service][PdfService][readPdf] An error has occurred when trying to unlock pdf")
            throw new Error(e)
        }
    }
}


export default PdfService