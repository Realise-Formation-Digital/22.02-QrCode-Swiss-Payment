import { PDFDocument, rgb } from 'pdf-lib';


/**
 * @class
 * @classdesc - Wrappers of library pdf unlocked
 */
class Pdf {
  /**
   * Function that loads the unlocked pdf file.
   * @param {*} file 
   * @returns - promise
   * @author Marco Tribuzio
   * @author Xavier de Juan
   */
  static async pdfLoad(file) {
    console.log("[libs][pdf][pdfLoad] Loading unlocked pdf", file)
    try {
      console.log(file)
      return await PDFDocument.load(file)
    } catch (e) {
      console.error("[libs][pdf][pdfLoad] Error when loading unlocked pdf", e)
      throw new Error
    }
  }
  /**
   * Function that takes pages and returns the first page
   * @param {*} pdfDoc 
   * @returns - object
   * @author Marco Tribuzio
   * @author Xavier de Juan
   */
  static gettingPages(pdfDoc) {
    console.log("[libs][pdf][gettingPages] Getting pages", pdfDoc)
    try {
      const pages = pdfDoc.getPages()
      console.log("libsPages 0?", pages[0])
      return pages[0]
    } catch (e) {
      console.error("[libs][pdf][gettingPages] Error when getting pages", e)
      throw new Error
    }
  }
  /**
   * Function that draws a white square instead of the BVR
   * @param {*} firstPage
   * @returns - void
   * @author Marco Tribuzio
   * @author Xavier de Juan
   */
  static drawRectangle(firstPage) {
    console.log("[libs][pdf][drawRectangle] rectangle drawed")
    try {
      const { width } = firstPage.getSize()
      firstPage.drawRectangle({
        x: 0,
        y: 0,
        width: width,
        height: 290,
        color: rgb(1, 1, 1),
      });
    } catch (e) {
      console.error("[libs][pdf][drawRectangle] Error drawing", e)
      throw new Error
    }
  }
  /**
   * Function that saves the modified pdf
   * @param {*} pdfDoc 
   * @returns - promise
   * @author Marco Tribuzio
   * @author Xavier de Juan
   */
  static async pdfSave(pdfDoc) {
    console.log("[libs][pdf][pdfSave] Save pdf")
    try {
      return await pdfDoc.save();
    } catch (e) {
      console.error("[libs][pdf][pdfSave] Error saving pdf", e)
      throw new Error
    }
  }
}


export default Pdf