const BASE_URL = 'https://rest.qr-invoice.cloud';
const API_KEY = process.env.VUE_APP_APIKEY;
const CSVLIST_OPTIONS = 'fontFamily=LIBERATION_SANS&fontsEmbedded=true&pageSize=DIN_LANG&resolution=MEDIUM_300_DPI&boundaryLines=true&boundaryLinesMargins=false&boundaryLineScissors=true&boundaryLineSeparationText=false&additionalPrintMargin=false&normalizeInput=false';
const MARKDWN_URL ="http://localhost:8080/README.md"
export {
  BASE_URL,
  API_KEY,
  CSVLIST_OPTIONS,
  MARKDWN_URL
}