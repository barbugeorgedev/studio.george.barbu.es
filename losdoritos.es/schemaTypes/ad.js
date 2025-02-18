export default {
  name: 'ad',
  title: 'Ads',
  type: 'document',
  fields: [
    {
      name: 'adType',
      title: 'Ad Type',
      type: 'string',
      options: {
        list: ['video', 'image', 'text', 'html'],
      },
    },
    {
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: ['custom', 'youtube'],
      },
      hidden: ({parent}) => parent?.adType !== 'video',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'url', // For video URLs
      hidden: ({parent}) => parent?.adType !== 'video' || parent?.videoType !== 'custom',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      hidden: ({parent}) => parent?.adType !== 'video' || parent?.videoType !== 'youtube',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image', // For image uploads
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => parent?.adType !== 'image',
    },
    {
      name: 'htmlContent',
      title: 'HTML Content',
      type: 'text',
      hidden: ({parent}) => parent?.adType !== 'html',
    },
    {
      name: 'textContent',
      title: 'Text Content',
      type: 'string',
      hidden: ({parent}) => parent?.adType !== 'text',
    },
    {
      name: 'displayTime',
      title: 'Display Time (seconds)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(60),
    },
  ],
}
