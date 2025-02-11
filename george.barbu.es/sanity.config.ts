import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {dashboardTool, projectUsersWidget, projectInfoWidget} from '@sanity/dashboard'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {GeneratePdfAction} from './deskStructure'
import {schemaTypes} from './schemaTypes'

const isLocal = process.env.NODE_ENV === 'development' || process.env.SANITY_STUDIO_ENV === 'local'

export default defineConfig({
  name: 'default',
  title: 'george.barbu.es',
  projectId: 'bet7jatc',
  dataset: 'production',
  plugins: [
    structureTool(),
    vercelDeployTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, {schemaType}) => {
      if (schemaType !== 'resume') return prev

      const deleteActionIndex = prev.findIndex((action) => action.action === 'delete')

      if (!isLocal) {
        return prev
      }

      if (deleteActionIndex === -1) {
        return [...prev, GeneratePdfAction]
      }

      return [
        ...prev.slice(0, deleteActionIndex), // Actions before delete
        GeneratePdfAction, // Insert Generate PDF here
        ...prev.slice(deleteActionIndex), // Keep delete action
      ]
    },
  },
})
