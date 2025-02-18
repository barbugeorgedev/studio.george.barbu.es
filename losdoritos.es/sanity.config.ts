import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {clearCacheTool} from './topMenu/clearCacheTool' // Import the new tool

import {dashboardTool} from '@sanity/dashboard'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'

export default defineConfig({
  name: 'default',
  title: 'losdoritos.es',

  projectId: 'edm60nwp',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    colorInput(),
    clearCacheTool(),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'My Netlify deploys',
          sites: [
            {
              title: 'Studio Los Doritos',
              apiId: process.env.SANITY_STUDIO_NETLIFY_API_ID!,
              buildHookId: process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID!,
              name: process.env.SANITY_STUDIO_NETLIFY_SITE_NAME,
            },
          ],
        }),
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
