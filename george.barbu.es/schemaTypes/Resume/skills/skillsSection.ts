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
        ],
        layout: 'dropdown',
      },
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
