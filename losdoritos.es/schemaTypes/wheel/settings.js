export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Settings Name',
      type: 'string',
      description: "A name for this settings configuration (e.g., 'Default Settings').",
      validation: (Rule) => Rule.required().error('A name is required.'),
    },
    {
      name: 'maxSpinsPerDay',
      title: 'Max Spins Per Day',
      type: 'number',
      description: 'The maximum number of spins allowed per visitor per day.',
      validation: (Rule) => Rule.min(1).max(100).error('Must be between 1 and 100'),
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description:
        "Use {spins} as a placeholder for remaining spins. Example: 'Start Spinning ({spins} left)'",
    },
    {
      name: 'enableAds',
      title: 'Enable Ads',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'ad',
      title: 'Advertisement',
      type: 'reference',
      to: [{type: 'ad'}],
      hidden: ({parent}) => !parent?.enableAds,
      validation: (Rule) =>
        Rule.custom((ad, context) => {
          if (context.parent?.enableAds && !ad) {
            return 'An advertisement must be selected when ads are enabled.'
          }
          return true
        }),
    },
    {
      name: 'perpendicularText',
      title: 'Perpendicular Text',
      type: 'boolean',
      initialValue: false,
      description: 'The orientation of the text on slide.',
    },
    {
      name: 'spinDuration',
      title: 'Spin Duration',
      type: 'number',
      initialValue: 0.5,
      description: 'Speed of wheel spin in seconds (range: 0.1 to 5 seconds)',
    },
    {
      name: 'textDistance',
      title: 'Text Distance',
      type: 'number',
      initialValue: 60,
    },
    {
      name: 'fontSize',
      title: 'Font Size',
      type: 'number',
      initialValue: 18,
    },
    {
      name: 'fontWeight',
      title: 'Font Weight',
      type: 'number',
      initialValue: 500,
    },
    {
      name: 'outerBorderColor',
      title: 'Outer Border Color',
      type: 'string',
      initialValue: '#fff',
    },
    {
      name: 'outerBorderWidth',
      title: 'Outer Border Width',
      type: 'number',
      initialValue: 10,
    },
    {
      name: 'innerBorderColor',
      title: 'Inner Border Color',
      type: 'string',
      initialValue: 'transparent',
    },
    {
      name: 'radiusLineColor',
      title: 'Radius Line Color',
      type: 'string',
      initialValue: '#fff',
    },
    {
      name: 'radiusLineWidth',
      title: 'Radius Line Width',
      type: 'number',
      initialValue: 1,
    },
    {
      name: 'template',
      title: 'Template',
      type: 'string',
      description: 'Select the template for the settings.',
      options: {
        list: ['DefaultTemplate', 'ClassicTemplate', 'ModernTemplate'],
      },
      initialValue: 'DefaultTemplate',
    },
    {
      name: 'showHeader',
      title: 'Show Header',
      type: 'string',
      options: {
        list: [
          {title: 'Default Header', value: 'default'},
          {title: 'Custom Header', value: 'custom'},
          {title: 'Hide Header', value: 'hide'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    },
    {
      name: 'customHeader',
      title: 'Custom Header',
      type: 'reference',
      to: [{type: 'header'}],
      hidden: ({parent}) => parent?.showHeader !== 'custom',
    },
    {
      name: 'showFooter',
      title: 'Show Footer',
      type: 'string',
      options: {
        list: [
          {title: 'Default Footer', value: 'default'},
          {title: 'Custom Footer', value: 'custom'},
          {title: 'Hide Footer', value: 'hide'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    },
    {
      name: 'customFooter',
      title: 'Custom Footer',
      type: 'reference',
      to: [{type: 'footer'}],
      hidden: ({parent}) => parent?.showFooter !== 'custom',
    },
  ],
}
