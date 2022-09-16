import { marked } from 'marked'

class MarkParse {
    txtParse(txtMd) {
        return marked.parse(txtMd)
    }
}

export default MarkParse