import { marked } from 'marked'
/**
 * @class
 * @classdesc - Wrapper of library Marked
 */
class MarkParse {
    static txtParse(txtMd) {
        return marked.parse(txtMd)
    }
}

export default MarkParse