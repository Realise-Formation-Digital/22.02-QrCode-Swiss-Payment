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
            state.callPdfLengthLib = payload.pdfDivaltoBlobLength
        }
    },
    actions: {
        async readPdf({ commit }, state) {
            try {
                console.log("[Store][storePdf][readPdf] Reading pdf with params", state)
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
                commit('readPdf', { pdf: response.data })
            } catch (e) {
                console.error("[store][storePdf][readPdf] An error has occurred when trying to read pdf")
                throw new Error(e)
            }
        },
        async unlockPdf({ commit }, state) {
            try {
                console.log("[store][storePdf][unlockPdf] Unlock pdf", state)
                const pdfToUnlock = new FormData()
                pdfToUnlock.append('pdf', state)

                const response = await axios.post(process.env.VUE_APP_PDFUNLOCK_URL, pdfToUnlock, {
                    responseType: "blob",
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/pdf',
                        'Accept-Language': 'fr'
                    }
                })
                if (response.status !== 200) throw Error('API unlock Error')
                commit('unlockPdf', { pdf: response })
                return response
            } catch (e) {
                console.error("[store][storePdf][unlockPdf] An error has occurred when trying to unlock pdf")
                throw new Error(e)
            }
        },
        async callPdfLibrary({ commit }, state) {
            try {
                const pdfFile = await Pdf.pdfLoad(state)
                const pages = Pdf.getPdfPages(pdfFile)
                Pdf.drawRectangle(pages)
                const savedPdf = await Pdf.savePdf(pdfFile)
                commit('callPdfLibrary', { pdf: savedPdf })
            } catch (e) {
                console.error("[store][storePdf][callPdfLibrary] Error loading and saving pdf", e)
                throw new Error
            }
        },
        async callPdfLengthLib({ commit }, state) {
            console.log("[store][storePdf][CallPdfLengthLib] Call the library to get the pdf Divalto blob length", state)
            try {
                const pdfArrayBuffer = await state.arrayBuffer()
                const pdfLoaded = await Pdf.pdfLoad(pdfArrayBuffer)
                const pdfLength = await Pdf.getPdfLength(pdfLoaded)
                commit('callPdfLengthLib', { pdfDivaltoBlobLength: pdfLength })
            } catch (e) {
                console.error("[store][storePdf][CallPdfLengthLib] An error has occurred when trying to get the pdf length")
                throw new Error(e)
            }
        },
    }
}

export default storePdf