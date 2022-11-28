import axios from 'axios';
import Pdf from '../libs/pdf.js'


const storePdf = {
    namespaced: true,
    state: {
        readPdf: null,
        unlockPdf: null,
        callPdfLibrary: null,
        callPdfLengthLib: null
    },
    getters: {
        getreadPdf: (state) => state.readPdf,
        getUnlockPdf: (state) => state.unlockPdf,
        getCallPdfLibrary: (state) => state.callPdfLibrary,
        getCallPdfLengthLib: (state) => state.callPdfLengthLib
    },
    mutations: {
        readPdf(state, payload) {
                state.readPdf = payload.pdf
        },
        unlockPdf(state, payload) {
            state.unlockPdf = payload.pdf
        },
        callPdfLibrary(state, payload) {
            state.callPdfLibrary = payload.pdf
        },
        callPdfLengthLib(state, payload) {
            state.callPdfLengthLib = payload.pdfLoaded
        }
    },
    actions: {
        async readPdf(state) {
            try {
                console.log("[Service][PdfService][readPdf] Reading pdf with params", state)
                const pdfToRead = new FormData()
                pdfToRead.append('pdf', state)

                const response = await axios.post(process.env.VUE_APP_PDFREAD_URL, pdfToRead, {
                    responseType: "application/json",
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/pdf',
                        'Accept-Language': 'fr'
                    }
                })
                if (response.status !== 200) throw Error('API merge Error')
                state.commit('', { pdf: response })
            } catch (e) {
                console.error("[Service][PdfService][readPdf] An error has occurred when trying to unlock pdf")
                throw new Error(e)
            }
        },
        async unlockPdf(state) {
            try {
                console.log("[Service][PdfService][mergeFiles] Unlock pdf", state)
                const pdfToUnlock = new FormData()
                pdfToUnlock.append('pdf', state)

                const response = await axios.post(process.env.VUE_APP_PDFUNLOCK_URL, pdfToUnlock, {
                    responseType: "blob",
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/pdf',
                        'Accept-Language': 'fr'
                    }
                }
                )
                if (response.status !== 200) throw Error('API merge Error')
                state.commit('unlockPdf', { pdf: response })
                return response
            } catch (e) {
                console.error("[Service][PdfService][mergeFiles] An error has occurred when trying to unlock pdf")
                throw new Error(e)
            }
        },
        async callPdfLibrary(state) {
            try {
                const pdfFile = await Pdf.pdfLoad(state)
                const pages = Pdf.getPdfPages(pdfFile)
                Pdf.drawRectangle(pages)
                state.commit('callPdfLibrary', { pdf: await Pdf.savePdf(pdfFile) })
            } catch (e) {
                console.error("[service][pdfService][callPdfLibrary] Error loading and saving pdf", e)
                throw new Error
            }
        },
        async callPdfLengthLib(state) {
            console.log("[Service][PdfService][CallPdfLengthLib] Call the library to get the state(pdfBlob) length", state)
            try {
                const pdfArrayBuffer = await state.arrayBuffer()
                const pdfLoaded = await Pdf.pdfLoad(pdfArrayBuffer)
                console.log('ciao ', pdfLoaded)
                state.commit('callPdfLengthLib', { pdfLoaded: Pdf.getPdfLength(pdfLoaded) })
            } catch (e) {
                console.error("[Service][PdfService][CallPdfLengthLib] An error has occurred when trying to get the pdf length")
                throw new Error(e)
            }
        },
    }
}

export default storePdf