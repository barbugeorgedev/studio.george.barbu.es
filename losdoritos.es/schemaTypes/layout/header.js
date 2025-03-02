export default {
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Header Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'menu',
      title: 'Menu',
      type: 'reference',
      to: [{type: 'menu'}],
    },
    {
      name: 'setAsDefault',
      title: 'Set as Default',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      isDefault: 'setAsDefault',
    },
    prepare({title, media, isDefault}) {
      return {
        title: isDefault ? `${title} (Default)` : title,
        media,
      }
    },
  },
}
