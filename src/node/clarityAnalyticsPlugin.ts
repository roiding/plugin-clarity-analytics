import type { Plugin, PluginObject } from '@vuepress/core'
import { logger, path } from '@vuepress/utils'

export interface ClarityAnalyticsPluginOptions {
  id: string
}

export const clarityAnalyticsPlugin =
  ({ id }: ClarityAnalyticsPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: 'vuepress-plugin-clarity-analytics',
    }

    if (!id) {
      logger.warn(`[${plugin.name}] 'id' is required`)
      return plugin
    }

    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __CLARITY_ID__: id,
      },
    }
  }
