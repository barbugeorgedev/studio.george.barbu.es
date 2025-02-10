import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {dashboardTool, projectUsersWidget, projectInfoWidget} from '@sanity/dashboard'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {GeneratePdfAction} from './deskStructure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'george.barbu.es',
  projectId: 'bet7jatc',
  dataset: 'production',
  plugins: [
    deskTool(), // ✅ Ensure this is included
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
    vercelDeployTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, {schemaType}) => {
      if (schemaType !== 'resume') return prev

      const deleteActionIndex = prev.findIndex((action) => action.action === 'delete')

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
