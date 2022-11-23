import axios from 'axios'
import MarkParse from '../libs/marked.js'
import { MARKDWN_URL } from '../libs/consts.js'

const mdStore = {
    namespaced: true,
    state: {
        markDown: null
    },
    getters: {
        getMarkDown: (state) => state.markDown
    },
    mutations: {
        markDown(state, payload) {
            console.log('MUTATIOOOON')
            state.markDown = payload.text
        }
    },
    actions: {
        async markDown(state) {
            try {
                console.log('ACTIOOOON')
                const response = await axios.get(MARKDWN_URL)
                if (response.status !== 200) console.log('ERRRRRORRRR')
                console.log('UUUUURRRRLLLLL', response)
                // const markDwnPayload = MarkParse.txtParse(response.data)
                state.commit('markDown', { text: MarkParse.txtParse(response.data) })
            } catch (e) {
                console.error()
            }
        }
    },
    modules: {

    }
}

export default mdStore