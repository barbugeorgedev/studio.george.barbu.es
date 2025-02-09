import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {dashboardTool, projectUsersWidget, projectInfoWidget} from '@sanity/dashboard'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'

export default defineConfig({
  name: 'default',
  title: 'george.barbu.es',

  projectId: 'bet7jatc',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    vercelDeployTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
