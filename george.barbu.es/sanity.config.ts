import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {colorInput} from '@sanity/color-input'
import {dashboardTool, projectUsersWidget, projectInfoWidget} from '@sanity/dashboard'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {GeneratePdfAction} from './deskStructure'
import {schemaTypes} from './schemaTypes'
import {studioStructure} from './deskStructure'
import {
  UploadToSpotifyAction,
  UploadToYouTubeMusicAction,
  UploadToYouTubeAction,
  UploadToAllAction
} from './studio/actions/distributionActions'
import {
  SyncSpotifyAccountAction,
  SyncYouTubeMusicAccountAction,
  SyncYouTubeAccountAction,
  SyncAllAccountsAction
} from './studio/actions/personaSyncActions'
import {
  DistributeAllSongsAction
} from './studio/actions/personaDistributionActions'

const isLocal = process.env.NODE_ENV === 'development' || process.env.SANITY_STUDIO_ENV === 'local'

export default defineConfig({
  name: 'default',
  title: 'george.barbu.es',
  projectId: 'bet7jatc',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) => studioStructure(S),
    }),
    colorInput(),
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
      // Add PDF generation action for resume documents
      if (schemaType === 'resume') {
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
      }

      // Add distribution upload actions for song documents
      // Actions appear prominently near the publish button
      // They check persona configuration when clicked and show an alert if not configured
      if (schemaType === 'song') {
        console.log('🎵 Registering distribution actions for song documents')
        
        // Simply append actions - Sanity will handle positioning
        const actions = [
          ...prev,
          UploadToSpotifyAction,
          UploadToYouTubeMusicAction,
          UploadToYouTubeAction,
          UploadToAllAction
        ]
        
        console.log('🎵 Total actions registered:', actions.length)
        return actions
      }

      // Add sync and distribution actions for persona documents
      if (schemaType === 'persona') {
        return [
          ...prev,
          SyncSpotifyAccountAction,
          SyncYouTubeMusicAccountAction,
          SyncYouTubeAccountAction,
          SyncAllAccountsAction,
          DistributeAllSongsAction
        ]
      }

      return prev
    },
  },
})
