import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {clearCacheTool} from './topMenu/clearCacheTool' // Import the new tool
import {apiId, buildHookId, siteName} from './env'
import {dashboardTool} from '@sanity/dashboard'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {wheelStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'losdoritos.es',

  projectId: 'edm60nwp',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) => wheelStructure(S),
    }),
    clearCacheTool(),
    colorInput(),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'My Netlify deploys',
          sites: [
            {
              title: 'Studio Los Doritos',
              apiId: apiId,
              buildHookId: buildHookId,
              name: siteName,
            },
          ],
        }),
      ],
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
