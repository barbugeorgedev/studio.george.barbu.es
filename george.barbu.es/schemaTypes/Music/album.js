import persona from './persona'
import UrlInput from './components/UrlInput'
import genre from './genre'

export default {
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: 'persona'}],
      validation: Rule => Rule.required(),
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'datetime',
    },
    {
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'genre',
      title: 'Genre',
      type: 'genre'
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      description: 'Link to this album on Spotify',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'youtubeMusicUrl',
      title: 'YouTube Music URL',
      type: 'url',
      description: 'Link to this album on YouTube Music',
      components: {
        input: UrlInput
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'songs',
      title: 'Tracklist',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'song'}],
        },
      ],
      validation: Rule => Rule.min(1),
    },
    {
      name: 'totalTracks',
      title: 'Total Tracks',
      type: 'number',
      readOnly: true,
      description: 'Automatically calculated from the tracklist',
    },
    {
      name: 'isPublic',
      title: 'Public',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist.name',
      media: 'coverArt',
      releaseDate: 'releaseDate',
    },
    prepare({title, artist, media, releaseDate}) {
      return {
        title,
        subtitle: `${artist ? 'by ' + artist : ''}${releaseDate ? ' • ' + new Date(releaseDate).getFullYear() : ''}`,
        media,
      }
    },
  },
} 