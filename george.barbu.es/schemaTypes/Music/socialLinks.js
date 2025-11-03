import UrlInput from './components/UrlInput'

export default {
  name: 'socialLinks',
  title: 'Social Links',
  type: 'object',
  fields: [
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'spotify',
      title: 'Spotify',
      type: 'url',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'youtubeMusic',
      title: 'YouTube Music',
      type: 'url',
      components: {
        input: UrlInput
      }
    }
  ]
} 