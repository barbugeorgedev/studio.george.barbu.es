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
      name: 'footerBackgroundColor',
      title: 'Footer Background Color',
      type: 'string',
      description:
        'Background color for Footer. Accepts color names like "black" or hex codes like "#0d0e12".',
    },
    {
      name: 'footerTextColor',
      title: 'Footer Text Color',
      type: 'string',
      description:
        'Text color for the Footer. Accepts color names like "white" or hex codes like "#ffffff".',
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'reference',
      to: [{type: 'menu'}],
    },
    {
      name: 'footerMenuColor',
      title: 'Footer Menu Text Color',
      type: 'string',
      description:
        'Menu Text color for the Footer. Accepts color names like "white" or hex codes like "#ffffff".',
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
            {name: 'color', title: 'Color', type: 'string'},
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
