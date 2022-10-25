import { PDFDocument, rgb } from 'pdf-lib';



class Pdf {

    static async test(file) {
        const pdfDoc = await PDFDocument.load(file)
        console.log("ciao", file)
        console.log("miao", pdfDoc)
    }
}


export default Pdf
