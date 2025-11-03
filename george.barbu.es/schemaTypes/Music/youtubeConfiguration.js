export default {
  name: 'youtubeConfiguration',
  title: 'YouTube Configuration',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Enable YouTube Distribution',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'apiKey',
      title: 'API Key',
      type: 'string',
      description: 'YouTube Data API v3 key',
      hidden: true
    },
    {
      name: 'channelId',
      title: 'YouTube Channel ID',
      type: 'string',
      description: 'Your YouTube channel ID'
    },
    {
      name: 'defaultPrivacy',
      title: 'Default Privacy Setting',
      type: 'string',
      options: {
        list: [
          {title: 'Public', value: 'public'},
          {title: 'Unlisted', value: 'unlisted'},
          {title: 'Private', value: 'private'}
        ]
      },
      initialValue: 'public'
    }
  ]
}

