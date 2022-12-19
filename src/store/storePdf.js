import { STORE_ACTIONS_INT, STORE_ACTIONS_EXT, STOREMUTATIONS } from '@/libs/consts.js';
import axios from 'axios';
import Pdf from '../libs/pdf.js';

const storePdf = {
    namespaced: true,
    state: {
        readPdf: null, //it will be an object
        unlockPdf: null,
        pdfArrayBuffer: null,
        callPdfLibrary: null,
        callPdfLengthLib: null,
        blobDivaltoPdf: null
    },
    getters: {
        getReadPdf: (state) => state.readPdf,
        getUnlockPdf: (state) => state.unlockPdf,
        getPdfArrayBuffer: (state) => state.pdfArrayBuffer,
        getCallPdfLibrary: (state) => state.callPdfLibrary,
        getCallPdfLengthLib: (state) => state.callPdfLengthLib,
        getBlobDivaltoPdf: (state) => state.blobDivaltoPdf
    },
    mutations: {
        readPdf(state, payload) {
            state.readPdf = payload.pdf
        },
        unlockPdf(state, payload) {
            state.unlockPdf = payload.formToApi
        },
        callPdfLibrary(state, payload) {
            state.callPdfLibrary = payload.savedPdf
        },
        callPdfLengthLib(state, payload) {
            state.callPdfLengthLib = payload.pdfDivaltoBlobLength
        },
        blobDivaltoPdf(state, payload) {
            state.blobDivaltoPdf = payload
        }
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
                commit(STOREMUTATIONS.READPDF, { pdf: response.data })
            } catch (e) {
                console.error("[store][storePdf][readPdf] An error has occurred when trying to read pdf")
                throw new Error(e)
            }
        },
        async unlockPdf({ commit, dispatch }, payload) {
            try {
                console.log("[store][storePdf][unlockPdf] Unlock pdf", payload)
                const { rawPdf } = payload
                const pdfToUnlock = new FormData()
                pdfToUnlock.append('pdf', rawPdf)
                const response = await axios.post(process.env.VUE_APP_PDFUNLOCK_URL, pdfToUnlock, {
                    responseType: "blob",
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/pdf',
                        'Accept-Language': 'fr'
                    }
                })
                if (response.status !== 200) throw Error('API unlock Error')
                await dispatch(STORE_ACTIONS_INT.PDFARRAYBUFFER, response)
                commit(STOREMUTATIONS.UNLOCKPDF, { formToApi: payload })
                await dispatch(STORE_ACTIONS_EXT.APIPAYLOAD, payload, {root: true})
            } catch (e) {
                console.error("[store][storePdf][unlockPdf] An error has occurred when trying to unlock pdf")
                throw new Error(e)
            }
        },
        async pdfArrayBuffer({ dispatch }, state) {
            try {
                console.log("[store][storePdf][pdfArrayBuffer] ArrayBuffer", state)
                const pdf = await state.data.arrayBuffer()
                await dispatch(STORE_ACTIONS_INT.CALLPDFLIBRARY, pdf)
                // if (pdf.status !== 200) throw Error('arrayBuffer error')
            } catch (e) {
                console.error("[store][storePdf][pdfArrayBuffer] Error ArrayBuffer failed", e)
                throw new Error
            }
        },
        async callPdfLibrary({ dispatch }, state) {
            try {
                const pdfFile = await Pdf.pdfLoad(state)
                const pages = Pdf.getPdfPages(pdfFile)
                Pdf.drawRectangle(pages)
                const savedPdf = await Pdf.savePdf(pdfFile)
                await dispatch(STORE_ACTIONS_INT.BLOBDIVALTOPDF, savedPdf)
            } catch (e) {
                console.error("[store][storePdf][callPdfLibrary] Error loading and saving pdf", e)
                throw new Error
            }
        },
        async blobDivaltoPdf({ dispatch, commit }, state) {
            try {
                console.log('[store][storePdf][blobDivaltoPdf] Convert the raw Divalto pdf to blob', state)
                const divaltoFileBlob = new Blob([state], { type: "application/pdf" });
                commit(STOREMUTATIONS.BLOBDIVALTOPDF, divaltoFileBlob)
                await dispatch(STORE_ACTIONS_INT.CALLPDFLENGTHLIB, divaltoFileBlob)
            } catch (e) {
                console.error('[store][storePdf][blobDivaltoPdf] Failed to convert the raw Divalto pdf to blob', e)
                throw new Error
            }
        },
        async callPdfLengthLib({ commit }, state) {
            console.log("[store][storePdf][CallPdfLengthLib] Call the library to get the pdf Divalto blob length", state)
            try {
                const pdfArrayBuffer = await state.arrayBuffer()
                const pdfLoaded = await Pdf.pdfLoad(pdfArrayBuffer)
                const pdfLength = await Pdf.getPdfLength(pdfLoaded)
                commit(STOREMUTATIONS.CALLPDFLENGTHLIB, { pdfDivaltoBlobLength: pdfLength })
            } catch (e) {
                console.error("[store][storePdf][CallPdfLengthLib] An error has occurred when trying to get the pdf length")
                throw new Error(e)
            }
        },
    }
}

export default storePdf