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
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Logo Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Text', value: 'text'},
            ],
            layout: 'radio', // Show as radio buttons
          },
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Logo Image',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.type !== 'image',
        },
        {
          name: 'text',
          title: 'Logo Text',
          type: 'string',
          hidden: ({parent}) => parent?.type !== 'text',
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          description: 'Choose a color for the text logo (e.g., #FF5733 or "blue")',
          hidden: ({parent}) => parent?.type !== 'text',
        },
      ],
    },
    {
      name: 'headerBackgroundColor',
      title: 'Header Background Color',
      type: 'string',
      description:
        'Background color for Header. Accepts color names like "black" or hex codes like "#0d0e12".',
    },
    {
      name: 'menu',
      title: 'Menu',
      type: 'reference',
      to: [{type: 'menu'}],
    },
    {
      name: 'stikyMenu',
      title: 'Set Header as Stiky',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'menuColors',
      title: 'Menu Colors',
      type: 'document',
      fields: [
        {
          name: 'mobileMenuIconsColor',
          title: 'Mobile Menu Icon Color',
          type: 'string',
          description: 'Color of the icon menu for mobile (default state).',
        },
        {
          name: 'menuLink',
          title: 'Menu Link Color',
          type: 'string',
          description: 'Color of the main menu links (default state).',
        },
        {
          name: 'menuHover',
          title: 'Menu Hover Color',
          type: 'string',
          description: 'Color when hovering over menu links.',
        },
        {
          name: 'dropdownBackground',
          title: 'Dropdown Background Color',
          type: 'string',
          description: 'Background color of the dropdown menu.',
        },
        {
          name: 'submenuLink',
          title: 'Submenu Link Color',
          type: 'string',
          description: 'Color of submenu links.',
        },
        {
          name: 'submenuHover',
          title: 'Submenu Hover Background Color',
          type: 'string',
          description: 'Background color when hovering over submenu links.',
        },
        {
          name: 'activeLink',
          title: 'Active Link Color',
          type: 'string',
          description: 'Color of the currently active menu link.',
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
