import { PDFDocument, rgb } from 'pdf-lib';



class Pdf {

    static async PdfLibrary(file) {
        const pdfDoc = await PDFDocument.load(file)
        console.log("ciao", file)
        console.log("miao", pdfDoc)
        const pages = pdfDoc.getPages()
        console.log("pages", pages)
        const firstPage = pages[0]
        console.log("firstPage", firstPage)
        const { width } = firstPage.getSize()
        console.log("{ width }", { width })
        firstPage.drawRectangle({
          x: 0,
          y: 0,
          width: width,
          height: 290,
          color: rgb(1, 1, 1),
        });
        const pdfBytes = await pdfDoc.save();
        console.log("pdfBytes", pdfBytes)
        return pdfBytes
    }
}


export default Pdf
