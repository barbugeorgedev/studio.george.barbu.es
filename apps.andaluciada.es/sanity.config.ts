import {defineConfig} from 'sanity'
import {dashboardTool, projectUsersWidget, projectInfoWidget} from '@sanity/dashboard'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'apps.andaluciada.es',

  projectId: 'qomw13cs',
  dataset: 'production',

  api: {
    graphql: true, // ✅ Enables GraphQL API
    http: true, // ✅ Allows HTTP requests (optional)
  },

  graphql: {
    apiVersion: '2024-01-27', // ✅ Use latest API version
    enablePlayground: true, // ✅ Allow GraphQL Playground
  },

  plugins: [
    structureTool(),
    visionTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
