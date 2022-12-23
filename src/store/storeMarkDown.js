import axios from 'axios'
import MarkParse from '../libs/marked.js'
import { MARKDWN_URL } from '../libs/consts.js'

const storeMarkDown = {
    namespaced: true,
    state: {
        markDown: null
    },
    getters: {
        getMarkDown: (state) => state.markDown
    },
    mutations: {
        markDown(state, payload) {
            state.markDown = payload.text
        }
    },
    actions: {
        /**
         * Function that get the url where is wrotten the readme text
         * @param {*} state
         * @returns {promise- object} 
         * @author - Xavier de Juan
         */
        async markDown(state) {
            try {
                const response = await axios.get(MARKDWN_URL)
                console.log("C'est quoi ça??", response)
                console.log("C'est quoi ça??", typeof response)
                if (response.status !== 200) console.log('Error')
                state.commit('markDown', { text: MarkParse.txtParse(response.data) })
            } catch (e) {
                console.error()
            }
        }
    },
}

export default storeMarkDown