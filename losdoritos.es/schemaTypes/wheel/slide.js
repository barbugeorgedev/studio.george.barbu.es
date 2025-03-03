export default {
  name: 'slide',
  title: 'Slide',
  type: 'document',
  fields: [
    {
      name: 'slideName',
      title: 'Slide Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Image', value: 'image'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      initialValue: 'Your prize text here!',
      hidden: ({parent}) => parent?.contentType !== 'text',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: '#ffffff',
      hidden: ({parent}) => parent?.contentType !== 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({parent}) => parent?.contentType !== 'image',
      fields: [
        {
          name: 'landscape',
          title: 'Landscape',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'sizeMultiplier',
          title: 'Size Multiplier',
          type: 'number',
          initialValue: 0.75,
        },
        {
          name: 'offsetX',
          title: 'Offset X',
          type: 'number',
          initialValue: 0,
        },
        {
          name: 'offsetY',
          title: 'Offset Y',
          type: 'number',
          initialValue: 0,
        },
      ],
    },
    {
      name: 'color',
      title: 'Slide Background',
      type: 'string',
      initialValue: '#ffffff',
    },
    {
      name: 'popupMessage',
      title: 'Pop-up Message',
      type: 'object',
      fields: [
        {name: 'content', title: 'Content', type: 'blockContent'},
        {name: 'ctaText', title: 'CTA Text', type: 'string'},
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
        {name: 'ctaUrl', title: 'CTA URL', type: 'url'},
        {
          name: 'showCloseButton',
          title: 'Show Close Button',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'showAdCta',
          title: 'Show AD CTA',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'adCtaText',
          title: 'AD CTA Text',
          type: 'string',
          hidden: ({parent}) => !parent?.showAdCta,
        },
        {
          name: 'adCtaBackgroundColor',
          title: 'CTA Background Color',
          type: 'string',
          description:
            'Background color for the CTA button. Accepts color names like "black" or hex codes like "#0d0e12".',
          hidden: ({parent}) => !parent?.showAdCta,
        },
        {
          name: 'adCtaTextColor',
          title: 'CTA Text Color',
          type: 'string',
          description:
            'Text color for the CTA button. Accepts color names like "white" or hex codes like "#ffffff".',
          hidden: ({parent}) => !parent?.showAdCta,
        },
      ],
    },
    {
      name: 'probability',
      title: 'Win Probability',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1),
      description:
        'Probability of landing on this slide (0 to 1). Must add up to 1 across all slides.',
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
    },
    {
      name: 'unpublishDate',
      title: 'Unpublish Date',
      type: 'datetime',
    },
  ],
}
