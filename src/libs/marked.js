import { marked } from 'marked'
/**
 * @class
 * @classdesc - Wrappers of library Markdown
 */
class MarkParse {
    static txtParse(txtMd) {
        return marked.parse(txtMd)
    }
}

export default MarkParse