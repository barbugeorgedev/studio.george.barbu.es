import platformStatus from './platformStatus'

// Distribution status per platform
export default {
  name: 'distributionStatus',
  title: 'Distribution Status',
  type: 'object',
  fields: [
    {
      name: 'spotify',
      title: 'Spotify',
      type: 'platformStatus',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'youtubeMusic',
      title: 'YouTube Music',
      type: 'platformStatus',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'youtube',
      title: 'YouTube',
      type: 'platformStatus',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ]
}
