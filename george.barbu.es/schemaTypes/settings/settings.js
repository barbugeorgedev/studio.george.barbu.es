export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  initialValue: {
    template: 'Default',
  },
  fields: [
    {
      name: 'name',
      title: 'Settings Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('A name is required.'),
    },
    {
      name: 'template',
      title: 'Template',
      type: 'string',
      options: {list: ['Default', 'Classic', 'Modern']},
    },
    {
      name: 'themeSettings',
      title: 'Theme Settings',
      type: 'themeSettings', // Reference the named object type
    },
  ],
}
