import {definePlugin} from 'sanity'
import {ClearCacheAction} from './actions/clearCacheAction'

export const clearCacheTool = definePlugin({
  name: 'clearCacheTool',
  tools: [
    {
      name: 'clear-cache',
      title: 'Clear Cache', // Appears in the top menu
      component: ClearCacheAction, // The React component
    },
  ],
})
