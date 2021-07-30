import {toHtml} from 'hast-util-to-html'

export default function rehypeStringify(config) {
  const settings = Object.assign({}, config, this.data('settings'))

  this.Compiler = compiler

  function compiler(tree) {
    return toHtml(tree, settings)
  }
}
