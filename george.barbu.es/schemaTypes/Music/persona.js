import socialLinks from './socialLinks'
import distributionConfiguration from './distributionConfiguration'
import UrlInput from './components/UrlInput'
import genre from './genre'

export default {
  name: 'persona',
  title: 'Persona',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich biography/about section for this persona'
    },
    {
      name: 'voiceCharacteristics',
      title: 'Voice Characteristics',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Deep', value: 'deep'},
          {title: 'High', value: 'high'},
          {title: 'Raspy', value: 'raspy'},
          {title: 'Smooth', value: 'smooth'},
          {title: 'Powerful', value: 'powerful'},
          {title: 'Soft', value: 'soft'},
          {title: 'Melodic', value: 'melodic'},
          {title: 'Rhythmic', value: 'rhythmic'}
        ]
      }
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      description: 'Link to this artist on Spotify',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'youtubeMusicUrl',
      title: 'YouTube Music URL',
      type: 'url',
      description: 'Link to this artist on YouTube Music',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'primaryGenre',
      title: 'Primary Genre',
      type: 'genre'
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'socialLinks'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'featuredSong',
      title: 'Featured Song',
      type: 'reference',
      to: [{type: 'song'}]
    },
    {
      name: 'distribution',
      title: 'Distribution Configuration',
      type: 'distributionConfiguration',
      description: 'Configure music distribution settings for this persona'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'primaryGenre',
      media: 'profileImage'
    }
  }
} 