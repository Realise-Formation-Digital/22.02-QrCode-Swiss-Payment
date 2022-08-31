const BASE_URL = 'https://rest.qr-invoice.cloud';
const API_KEY = process.env.NODE_ENV === 'production' ? '?api_key=40129735-8390-4442-85a0-3b2fb4582110' : '?api_key=40129735-8390-4442-85a0-3b2fb4582110';
const CSVLIST_OPTIONS = 'fontFamily=LIBERATION_SANS&fontsEmbedded=true&pageSize=DIN_LANG&resolution=MEDIUM_300_DPI&boundaryLines=true&boundaryLinesMargins=false&boundaryLineScissors=true&boundaryLineSeparationText=false&additionalPrintMargin=false&normalizeInput=false';
export {
  BASE_URL,
  API_KEY,
  CSVLIST_OPTIONS
}