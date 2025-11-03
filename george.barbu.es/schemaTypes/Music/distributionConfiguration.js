import spotifyConfiguration from './spotifyConfiguration'
import youtubeMusicConfiguration from './youtubeMusicConfiguration'
import youtubeConfiguration from './youtubeConfiguration'
import autoSyncSettings from './autoSyncSettings'

// This is an object type that can be embedded in persona
export default {
  name: 'distributionConfiguration',
  title: 'Distribution Configuration',
  type: 'object',
  fields: [
    {
      name: 'spotify',
      title: 'Spotify Configuration',
      type: 'spotifyConfiguration',
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      name: 'youtubeMusic',
      title: 'YouTube Music Configuration',
      type: 'youtubeMusicConfiguration',
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      name: 'youtube',
      title: 'YouTube Configuration',
      type: 'youtubeConfiguration',
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      name: 'autoSync',
      title: 'Auto Sync Settings',
      type: 'autoSyncSettings',
      description: 'Automatically distribute songs when created/updated'
    }
  ]
}

