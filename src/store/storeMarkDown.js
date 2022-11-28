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
        async markDown(state) {
            try {
                const response = await axios.get(MARKDWN_URL)
                if (response.status !== 200) console.log('Error')
                state.commit('markDown', { text: MarkParse.txtParse(response.data) })
            } catch (e) {
                console.error()
            }
        }
    },
}

export default storeMarkDown