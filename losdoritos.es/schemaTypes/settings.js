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
      hidden: ({parent}) => !parent?.enableAds, // Hide when ads are disabled
      validation: (Rule) =>
        Rule.custom((ad, context) => {
          if (context.parent?.enableAds && !ad) {
            return 'An advertisement must be selected when ads are enabled.'
          }
          return true
        }),
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
  ],
}
