import UrlInput from './components/UrlInput'

// Platform status (used for Spotify, YouTube Music, and YouTube)
export default {
  name: 'platformStatus',
  title: 'Platform Status',
  type: 'object',
  fields: [
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Not Published', value: 'pending'},
          {title: 'Publishing', value: 'processing'},
          {title: 'Published', value: 'synced'},
          {title: 'Failed', value: 'failed'}
        ]
      },
      initialValue: 'pending',
      readOnly: true,
      description: 'Automatically updated when publishing'
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the track (automatically filled after publishing)',
      readOnly: true,
      components: {
        input: UrlInput
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      readOnly: true
    }
  ]
}

