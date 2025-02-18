import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {clearCacheTool} from './topMenu/clearCacheTool' // Import the new tool

export default defineConfig({
  name: 'default',
  title: 'losdoritos.es',

  projectId: 'edm60nwp',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    colorInput(),
    clearCacheTool(), // ✅ Add the Clear Cache tool to the top menu
  ],

  schema: {
    types: schemaTypes,
  },
})
