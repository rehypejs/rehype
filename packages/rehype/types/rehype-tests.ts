import rehype = require('rehype')

interface PluginOptions {
  example: boolean
}

const plugin = (options?: PluginOptions) => {}

rehype().use(plugin)
rehype().use(plugin, {example: true})
rehype().use({settings: {fragment: true}})
rehype().use({settings: {upperDoctype: true}})
