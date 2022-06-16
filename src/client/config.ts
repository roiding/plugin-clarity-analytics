import { defineClientConfig } from '@vuepress/client'
import { useClarityAnalytics } from './composables'

declare const __CLARITY_ID__: string

const id = __CLARITY_ID__

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_SSR__) return

    useClarityAnalytics(id)
  },
})
