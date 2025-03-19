import { defineType } from 'sanity';

export default defineType({
  name: 'educationSection',
  title: 'Education Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Education'
    },
    {
      name: 'items',
      title: 'Education History',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'education' }] }],
      validation: (Rule) => Rule.unique()
    }
  ]
});
