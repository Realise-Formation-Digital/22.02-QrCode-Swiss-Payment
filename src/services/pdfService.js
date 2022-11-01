import Pdf from '@/libs/pdf.js'


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
            const pages = Pdf.getLastPage(pdfFile)
            Pdf.drawRectangle(pages)
            return await Pdf.savePdf(pdfFile)
        } catch (e) {
            console.error("[service][pdfService][callPdfLibrary] Error loading and saving pdf", e)
            throw new Error
        }
    }
}


export default PdfService