import { marked } from 'marked'

class MarkParse {
    static txtParse(txtMd) {
        return marked.parse(txtMd)
    }
}

export default MarkParse