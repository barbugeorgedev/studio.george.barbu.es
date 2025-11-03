import SunoIdInput from './components/SunoIdInput'
import AudioFileInput from './components/AudioFileInput'
import genre from './genre'

export default {
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'sunoId',
      title: 'Suno AI ID',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Suno AI song ID. A clickable link will appear below when an ID is entered.',
      components: {
        input: SunoIdInput
      }
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*'
      },
      components: {
        input: AudioFileInput
      },
      description: 'Upload an audio file. Duration will be automatically extracted.'
    },
    {
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      readOnly: true,
      description: 'Automatically extracted from the audio file'
    },
    {
      name: 'genre',
      title: 'Genre',
      type: 'genre'
    },
    {
      name: 'mood',
      title: 'Mood',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Happy', value: 'happy'},
          {title: 'Sad', value: 'sad'},
          {title: 'Energetic', value: 'energetic'},
          {title: 'Calm', value: 'calm'},
          {title: 'Romantic', value: 'romantic'},
          {title: 'Aggressive', value: 'aggressive'},
          {title: 'Melancholic', value: 'melancholic'},
          {title: 'Uplifting', value: 'uplifting'}
        ]
      }
    },
    {
      name: 'persona',
      title: 'Assigned Persona',
      type: 'reference',
      to: [{type: 'persona'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'album',
      title: 'Album',
      type: 'reference',
      to: [{type: 'album'}],
      description: 'Album this song belongs to (optional)'
    },
    {
      name: 'distributionStatus',
      title: 'Distribution Status',
      type: 'distributionStatus',
      readOnly: true,
      description: 'Automatically shows distribution status for all configured platforms. Status is updated when you use the publish buttons above.'
    },
    {
      name: 'syncStatus',
      title: 'Sync Status (Deprecated)',
      type: 'string',
      hidden: true,
      readOnly: true,
      description: 'Deprecated: Use Distribution Status instead. This field is kept for backwards compatibility.'
    },
    {
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'isPublic',
      title: 'Public',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'isFeatured',
      title: 'Featured Song',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this song as featured to highlight it on the site'
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'datetime'
    },
    {
      name: 'bpm',
      title: 'BPM',
      type: 'number'
    },
    {
      name: 'key',
      title: 'Musical Key',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title',
      persona: 'persona.name',
      album: 'album.title',
      media: 'coverArt',
      isFeatured: 'isFeatured'
    },
    prepare({title, persona, album, media, isFeatured}) {
      return {
        title: isFeatured ? `⭐ ${title}` : title,
        subtitle: `${album ? album + ' • ' : ''}by ${persona}`,
        media
      }
    }
  }
} 