import {PDFDocument, rgb} from 'pdf-lib';


/**
 * @class
 * @classdesc - Wrappers of library pdf unlocked
 */
class Pdf {

  /**
   * Function that takes pages and returns the first page
   * @param {*} pdfDoc
   * @returns - object
   * @author Marco Tribuzio
   * @author Xavier de Juan
   */
  static gettingPages(pdfDoc) {
    console.log("[libs][pdf][gettingPages] Getting pages with param", pdfDoc)
    try {
      const pages = pdfDoc.getPages()
      return pages[pages.lenght - 1]
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
    console.log("[libs][pdf][drawRectangle] rectangle drawed with param")
    try {
      const {width} = firstPage.getSize()
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

  static async pdfLoad(file) {
    console.log('[Lib][PDF][pdfLoad] Loading pdf with params', file)
    try {
      return await PDFDocument.load(file)
    } catch (e) {
      console.error('[Lib][PDF][pdfLoad] An error occurred when loading pdf', e)
      throw new Error('') //todo
    }
  }

  static async savePdf(pdfDoc) {
    console.log('[Lib][PDF][save] saving pdf with params', pdfDoc)
    try {
      return await pdfDoc.save()
    } catch (e) {
      console.error('[Lib][PDF][pdfLoad] An error occurred when saving pdf', e)
      throw new Error('') //todo
    }
  }

  static getPdfFirstPage(pdfDoc) {
    console.log('[Lib][PDF][getPdfFirstPage] Getting first page with params', pdfDoc)
    const pages = pdfDoc.getPages()
    return pages[0]
  }

  static getPdfWidth(pdfPage) {
    console.log('[Lib][PDF][getPdfWidth] Getting pdf width with params', pdfPage)
    const {width} = pdfPage.getSize()
    return width
  }

}


export default Pdf