import { PDFDocument } from 'pdf-lib';

class Pdf {

  static async test(file) {
    const pdfDoc = await PDFDocument.load(file)
    console.log("ciao", file)

  }

}

export default Pdf
