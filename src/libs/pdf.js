import { PDFDocument, rgb } from 'pdf-lib';


/**
 * @class
 * @classdesc - Work with nodejs local server
 */
class Pdf {
  /**
   * Function that takes pages and returns the last page
   * @param {*} pdfDoc - the document that has been loaded
   * @returns {object}
   * @author Marco Tribuzio
   * @author Xavier de Juan
   */
  static getPdfPages(pdfDoc) {
    console.log("[libs][pdf][getPdfPages] Getting pages with param", pdfDoc)
    try {
      const pagesList = pdfDoc.getPages()
      return pagesList[pagesList.length - 1]
    } catch (e) {
      console.error("[libs][pdf][getPdfPages] Error when getting pages", e)
      throw new Error
    }
  }
  /**
   * Function taking the pdf page(s) and giving the length
   * @param {*} pdfDoc 
   * @returns {array length}
   * @author Xavier de Juan
   */
  static getPdfLength(pdfDoc) {
    console.log("[libs][pdf][getPdfLength] Getting pages length with params", pdfDoc)
    try {
      const pagesList = pdfDoc.getPages()
      return pagesList.length
    } catch (e) {
      console.error("[libs][pdf][getPdfLength] Error when getting pages length", e)
      throw new Error
    }
  }
  /**
   * Function that draws a white square instead of the BVR
   * @param {*} page
   * @returns {void}
   * @author Marco Tribuzio
   * @author Xavier de Juan
   */
  static drawRectangle(page) {
    console.log("[libs][pdf][drawRectangle] rectangle drawed with param")
    try {
      const { width } = page.getSize()
      page.drawRectangle({
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
   * Function that loads the pdf file
   * @param {*} file 
   * @returns {promise}
   * @author Xavier de Juan
   */
  static async pdfLoad(file) {
    console.log('[Lib][PDF][pdfLoad] Loading pdf with params', file)
    try {
      return await PDFDocument.load(file)
    } catch (e) {
      console.error('[Lib][PDF][pdfLoad] An error occurred when loading pdf', e)
      throw new Error('') //todo
    }
  }
  /**
   * Function that saves the pdf file
   * @param {*} pdfDoc 
   * @returns {promise}
   * @author Xavier de Juan
   */
  static async savePdf(pdfDoc) {
    console.log('[Lib][PDF][savePdf] saving pdf with params', pdfDoc)
    try {
      return await pdfDoc.save()
    } catch (e) {
      console.error('[Lib][PDF][savePdf] An error occurred when saving pdf', e)
      throw new Error('') //todo
    }
  }
}


export default Pdf