export default {
  name: 'analytics',
  title: 'Analytics',
  type: 'document',
  fields: [
    {
      name: 'song',
      title: 'Song',
      type: 'reference',
      to: [{type: 'song'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Play', value: 'play'},
          {title: 'Download', value: 'download'},
          {title: 'Skip', value: 'skip'},
          {title: 'Like', value: 'like'},
          {title: 'Share', value: 'share'},
          {title: 'Add to Playlist', value: 'add_to_playlist'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'sessionId',
      title: 'Session ID',
      type: 'string'
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'string'
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string'
    },
    {
      name: 'durationPlayed',
      title: 'Duration Played (seconds)',
      type: 'number'
    },
    {
      name: 'completionRate',
      title: 'Completion Rate (%)',
      type: 'number'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint'
    },
    {
      name: 'referrer',
      title: 'Referrer',
      type: 'string'
    }
  ],
  preview: {
    select: {
      song: 'song.title',
      eventType: 'eventType',
      timestamp: 'timestamp'
    },
    prepare({song, eventType, timestamp}) {
      return {
        title: `${eventType} - ${song}`,
        subtitle: new Date(timestamp).toLocaleString()
      }
    }
  }
} 