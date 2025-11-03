import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'bet7jatc',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  /**
   * App configuration for fine-grained version control.
   * Get your appId from https://sanity.io/manage/project/bet7jatc/studios
   * Note: This may require additional configuration in your Sanity project settings.
   */
  // app: {
  //   id: 'aaagv8q0i989kdgk9h47hdsw'
  // } 
})
