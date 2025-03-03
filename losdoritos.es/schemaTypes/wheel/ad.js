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
      name: 'videoSettings',
      title: 'Video Settings',
      type: 'object',
      hidden: ({parent}) => parent?.adType !== 'video',
      fields: [
        {
          name: 'videoType',
          title: 'Video Type',
          type: 'string',
          options: {
            list: ['custom', 'youtube'],
          },
        },
        {
          name: 'customUrl',
          title: 'Custom URL',
          type: 'url',
          hidden: ({parent}) => parent?.videoType !== 'custom',
        },
        {
          name: 'youtubeUrl',
          title: 'YouTube URL',
          type: 'url',
          hidden: ({parent}) => parent?.videoType !== 'youtube',
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
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
    {
      name: 'popupSettings',
      title: 'Popup Settings',
      type: 'object',
      fields: [
        {
          name: 'popupContent',
          title: 'Popup Content',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        },
        {
          name: 'ctaBackgroundColor',
          title: 'CTA Background Color',
          type: 'string',
          description:
            'Background color for the CTA button. Accepts color names like "black" or hex codes like "#0d0e12".',
        },
        {
          name: 'ctaTextColor',
          title: 'CTA Text Color',
          type: 'string',
          description:
            'Text color for the CTA button. Accepts color names like "white" or hex codes like "#ffffff".',
        },
        {
          name: 'showTime',
          title: 'Show Time',
          type: 'boolean',
        },
      ],
    },
  ],
}
