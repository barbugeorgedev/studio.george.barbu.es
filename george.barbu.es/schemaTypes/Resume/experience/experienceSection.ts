import { defineType } from 'sanity';

export default defineType({
  name: 'experienceSection',
  title: 'Experience Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Experience'
    },
    {
      name: 'items',
      title: 'Professional Experience',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'experience' }],
        options: { filter: 'earlyCareer == false' }
      }],
      validation: (Rule) => Rule.unique()
    }
  ]
});
