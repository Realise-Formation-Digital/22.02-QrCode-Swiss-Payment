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
const SUCCESSCODE = Object.freeze({
    QRCODEDOWNLOADED: 'qrCodeDwnld',
    PDFUPLOADED: 'pdfUpload'
})
const ERRORCODE = Object.freeze({
    ERRORQRCODEDOWNLOAD: 'qrCodedwnldError',
    ERRORPDFUPLOAD: 'pdfUploadError'
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
    ERRORCODE
}