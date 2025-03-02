export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  {title: 'None (just submenu)', value: 'none'},
                  {title: 'Page', value: 'page'},
                  {title: 'Custom URL', value: 'custom'},
                  {title: 'Wheel', value: 'wheel'},
                ],
                layout: 'radio',
              },
              initialValue: 'none',
            },
            {
              name: 'pageLink',
              title: 'Page Link',
              type: 'reference',
              to: [{type: 'contentPage'}, {type: 'contactPage'}],
              hidden: ({parent}) => parent?.linkType !== 'page',
            },
            {
              name: 'customLink',
              title: 'Custom URL',
              type: 'string',
              hidden: ({parent}) => parent?.linkType !== 'custom',
            },
            {
              name: 'wheelLink',
              title: 'Link to Wheel',
              type: 'reference',
              to: [{type: 'wheel'}],
              hidden: ({parent}) => parent?.linkType !== 'wheel',
            },
            {
              name: 'submenu',
              title: 'Submenu',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'linkType',
                      title: 'Link Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'None (just submenu)', value: 'none'},
                          {title: 'Page', value: 'page'},
                          {title: 'Custom URL', value: 'custom'},
                          {title: 'Wheel', value: 'wheel'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'none',
                    },
                    {
                      name: 'pageLink',
                      title: 'Page Link',
                      type: 'reference',
                      to: [{type: 'contentPage'}, {type: 'contactPage'}],
                      hidden: ({parent}) => parent?.linkType !== 'page',
                    },
                    {
                      name: 'customLink',
                      title: 'Custom URL',
                      type: 'url',
                      hidden: ({parent}) => parent?.linkType !== 'custom',
                    },
                    {
                      name: 'wheelLink',
                      title: 'Link to Wheel',
                      type: 'reference',
                      to: [{type: 'wheel'}],
                      hidden: ({parent}) => parent?.linkType !== 'wheel',
                    },
                    {
                      name: 'submenu',
                      title: 'Submenu',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'label',
                              title: 'Label',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            },
                            {
                              name: 'linkType',
                              title: 'Link Type',
                              type: 'string',
                              options: {
                                list: [
                                  {title: 'None (just submenu)', value: 'none'},
                                  {title: 'Page', value: 'page'},
                                  {title: 'Custom URL', value: 'custom'},
                                  {title: 'Wheel', value: 'wheel'},
                                ],
                                layout: 'radio',
                              },
                              initialValue: 'none',
                            },
                            {
                              name: 'pageLink',
                              title: 'Page Link',
                              type: 'reference',
                              to: [{type: 'contentPage'}, {type: 'contactPage'}],
                              hidden: ({parent}) => parent?.linkType !== 'page',
                            },
                            {
                              name: 'customLink',
                              title: 'Custom URL',
                              type: 'url',
                              hidden: ({parent}) => parent?.linkType !== 'custom',
                            },
                            {
                              name: 'wheelLink',
                              title: 'Link to Wheel',
                              type: 'reference',
                              to: [{type: 'wheel'}],
                              hidden: ({parent}) => parent?.linkType !== 'wheel',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
