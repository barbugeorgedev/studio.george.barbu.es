export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Footer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'reference',
      to: [{type: 'menu'}],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform', type: 'string'},
            {
              name: 'icon',
              title: 'Icon (Library Name)',
              type: 'string',
              description:
                'Enter the icon name (e.g., "FaTiktok" - https://react-icons.github.io/react-icons/icons/fa/)',
            },
            {name: 'url', title: 'URL', type: 'url'},
          ],
          preview: {
            select: {
              title: 'platform',
              icon: 'icon',
            },
            prepare({title, icon}) {
              return {
                title,
                subtitle: icon ? `Icon: ${icon}` : 'No icon selected',
              }
            },
          },
        },
      ],
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
      isDefault: 'setAsDefault',
    },
    prepare({title, isDefault}) {
      return {
        title: isDefault ? `${title} (Default)` : title,
      }
    },
  },
}
