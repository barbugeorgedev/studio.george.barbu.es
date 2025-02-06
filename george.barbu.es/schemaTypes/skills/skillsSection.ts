import { defineType } from 'sanity';

export default defineType({
  name: 'skillsSection',
  title: 'Skills Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Skills'
    },
    {
      name: 'items',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
      validation: (Rule) => Rule.unique()
    }
  ]
});


