import { defineType } from 'sanity';

export default defineType({
  name: 'ngoExperienceSection',
  title: 'NGO Experience Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'NGO Experience'
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
      title: 'NGO Experience',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'ngoExperience' }] }],
      validation: (Rule) => Rule.unique()
    }
  ]
});
