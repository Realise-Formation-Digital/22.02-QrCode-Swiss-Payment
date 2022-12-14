import axios from 'axios';
import Pdf from '../libs/pdf.js';

const storePdf = {
    namespaced: true,
    state: {
        readPdf: null, //it wiil be an object
        unlockPdf: null,
        pdfArrayBuffer: null,
        callPdfLibrary: null,
        callPdfLengthLib: null,
        blobDivaltoPdf: null,
    },
    getters: {
        getreadPdf: (state) => state.readPdf,
        getUnlockPdf: (state) => state.unlockPdf,
        getPdfArrayBuffer: (state) => state.pdfArrayBuffer,
        getCallPdfLibrary: (state) => state.callPdfLibrary,
        getCallPdfLengthLib: (state) => state.callPdfLengthLib,
        getBlobDivaltoPdf: (state) => state.blobDivaltoPdf,
    },
    mutations: {
        readPdf(state, payload) {
            state.readPdf = payload.pdf
        },
        callPdfLibrary(state, payload) {
            state.callPdfLibrary = payload.savedPdf
        },
        callPdfLengthLib(state, payload) {
            state.callPdfLengthLib = payload.pdfDivaltoBlobLength
        },
        blobDivaltoPdf(state, payload) {
            state.blobDivaltoPdf = payload.divaltoFileBlob
        },
    },
    actions: {
        async readPdf({ commit }, state) {
            try {
                console.log("[store][storePdf][readPdf] Reading pdf with params", state)
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
        async unlockPdf({ dispatch }, state) {
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
                await dispatch('pdfArrayBuffer', response)
                // return response
            } catch (e) {
                console.error("[store][storePdf][unlockPdf] An error has occurred when trying to unlock pdf")
                throw new Error(e)
            }
        },

        async pdfArrayBuffer({ dispatch }, state) {
            try {
                console.log("[store][storePdf][pdfArrayBuffer] ArrayBuffer response pdf unlocked", state)
                const pdf = await state.data.arrayBuffer()
                // if (pdf.status !== 200) throw Error('arrayBuffer error')
                await dispatch('callPdfLibrary', pdf)
            } catch (e) {
                console.error("[store][storePdf][pdfArrayBuffer] Error response pdf unlocked", e)
                throw new Error
            }
        },
        async callPdfLibrary({ commit }, state) {
            try {
                const pdfFile = await Pdf.pdfLoad(state)
                const pages = Pdf.getPdfPages(pdfFile)
                Pdf.drawRectangle(pages)
                const savedPdf = await Pdf.savePdf(pdfFile)
                commit('callPdfLibrary', { savedPdf: savedPdf })
            } catch (e) {
                console.error("[store][storePdf][callPdfLibrary] Error loading and saving pdf", e)
                throw new Error
            }
        },
        async blobDivaltoPdf({ dispatch, commit }, state) {
            try {
                console.log('[store][storePdf][blobRawPdf] Convert the raw Divalto pdf to blob', state)
                const divaltoFileBlob = new Blob([state], { type: "application/pdf" })
                dispatch('callPdfLengthLib', divaltoFileBlob)
                commit('blobRawPdf', { divaltoFileBlob: divaltoFileBlob })
            } catch (e) {
                console.error('[store][storePdf][blobRawPdf] Failed to convert the raw Divalto pdf to blob', e)
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