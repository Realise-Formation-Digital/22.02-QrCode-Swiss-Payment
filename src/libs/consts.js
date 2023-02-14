const BASE_URL = process.env.VUE_APP_BASE_URL;
const API_KEY = process.env.VUE_APP_APIKEY;
const CSVLIST_OPTIONS = process.env.VUE_APP_CSVLIST_OPTIONS;
const MARKDWN_URL = process.env.VUE_APP_MARKDOWN_URL;
const XML_QRR = 'QRR'
const XML_ULTIMATE_DEBTOR = 'UltmtDbtr'
const XML_CREDITOR_ACCOUNT = 'CdtrAcct'
const XML_PRTRY = 'Prtry'
const XML_NTRY_REF = 'NtryRef'
const XML_ISR_REFERENCE = 'ISR Reference'
const XML_DIVALTO_ACCOUNT = '010458810'
const XML_IBAN = process.env.VUE_APP_CREDITOR_INFORMATION_IBAN
// Snackbar success
const SUCCESSCODE = Object.freeze({
    QRCODEDOWNLOADED: 'qrCodeDwnld',
    XMLCONVERTED: 'conversionXml'
})
// Snackbar error
const ERRORCODE = Object.freeze({
    ERRORQRCODEDOWNLOAD: 'qrCodedwnldError',
    ERRORCONVERT: 'conversionError'
})
// Variables inside state management
const STORE_ACTIONS_INT = Object.freeze({
    READPDF: 'readPdf',
    UNLOCKPDF: 'unlockPdf',
    PDFARRAYBUFFER: 'pdfArrayBuffer',
    CALLPDFLIBRARY: 'callPdfLibrary',
    BLOBDIVALTOPDF: 'blobDivaltoPdf',
    CALLPDFLENGTHLIB: 'callPdfLengthLib',
    APIPAYLOAD: 'apiPayload',
    SENDSINGLEPAYMENT: 'sendSinglePayment',
    BLOBQRPDF: 'blobQrPdf',
    SENDMERGEDFILES: 'sendMergedFiles',
    COUNTRIESLIST: 'countriesList',
    RAWXMLFILE: 'rawXmlFile',
})
// Variables outside state management
const STORE_ACTIONS_EXT = Object.freeze({
    READPDF: 'storePdf/readPdf',
    UNLOCKPDF: 'storePdf/unlockPdf',
    PDFARRAYBUFFER: 'storePdf/pdfArrayBuffer',
    CALLPDFLIBRARY: 'storePdf/callPdfLibrary',
    BLOBDIVALTOPDF: 'storePdf/blobDivaltoPdf',
    CALLPDFLENGTHLIB: 'storePdf/callPdfLengthLib',
    APIPAYLOAD: 'storeApiQr/apiPayload',
    SENDSINGLEPAYMENT: 'storeApiQr/sendSinglePayment',
    BLOBQRPDF: 'storeApiQr/blobQrPdf',
    SENDMERGEDFILES: 'storeApiQr/sendMergedFiles',
    COUNTRIESLIST: 'storeApiQr/countriesList',
    RAWXMLFILE: 'storeXml/actRawXmlFile'
})
const STOREMUTATIONS = Object.freeze({
    READPDF: 'readPdf',
    UNLOCKPDF: 'unlockPdf',
    PDFARRAYBUFFER: 'pdfArrayBuffer',
    CALLPDFLIBRARY: 'callPdfLibrary',
    BLOBDIVALTOPDF: 'blobDivaltoPdf',
    CALLPDFLENGTHLIB: 'callPdfLengthLib',
    APIPAYLOAD: 'apiPayload',
    SENDSINGLEPAYMENT: 'sendSinglePayment',
    BLOBQRPDF: 'blobQrPdf',
    SENDMERGEDFILES: 'sendMergedFiles',
    COUNTRIESLIST: 'countriesList',
    RAWXMLFILE: 'mutRawXmlFile',
})
const STOREGETTERS = Object.freeze({
    READPDF: 'storePdf/getReadPdf',
    UNLOCKPDF: 'storePdf/getUnlockPdf',
    PDFARRAYBUFFER: 'storePdf/getPdfArrayBuffer',
    CALLPDFLIBRARY: 'storePdf/getCallPdfLibrary',
    BLOBDIVALTOPDF: 'storePdf/getBlobDivaltoPdf',
    CALLPDFLENGTHLIB: 'storePdf/getCallPdfLengthLib',
    APIPAYLOAD: 'storeApiQr/getApiPayload',
    SENDSINGLEPAYMENT: 'storeApiQr/getSendSinglePayment',
    BLOBQRPDF: 'storeApiQr/getBlobQrPdf',
    SENDMERGEDFILES: 'storeApiQr/getSendMergedFiles',
    COUNTRIESLIST: 'storeApiQr/getCountriesList',
    RAWXMLFILE: 'storeXml/getRawXmlFile',
})
export {
    BASE_URL,
    API_KEY,
    CSVLIST_OPTIONS,
    MARKDWN_URL,
    XML_QRR,
    XML_IBAN,
    XML_ISR_REFERENCE,
    XML_DIVALTO_ACCOUNT,
    XML_PRTRY,
    XML_NTRY_REF,
    XML_CREDITOR_ACCOUNT,
    XML_ULTIMATE_DEBTOR,
    SUCCESSCODE,
    ERRORCODE,
    STORE_ACTIONS_INT,
    STORE_ACTIONS_EXT,
    STOREMUTATIONS,
    STOREGETTERS
}