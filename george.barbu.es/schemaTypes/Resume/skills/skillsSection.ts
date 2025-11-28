import {defineType} from 'sanity'

export default defineType({
  name: 'skillsSection',
  title: 'Skills Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Skills',
    },
    {
      name: 'view',
      title: 'View',
      type: 'string',
      initialValue: 'tags',
      options: {
        list: [
          {title: 'tags', value: 'tags'},
          {title: 'list', value: 'list'},
          {title: 'styled-list', value: 'styled-list'},
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'disabled',
      title: 'Disable Section',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, this section will be hidden.'
    },
    {
      name: 'items',
      title: 'Skills',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'skill'}]}],
      validation: (Rule) => Rule.unique(),
    },
  ],
})
