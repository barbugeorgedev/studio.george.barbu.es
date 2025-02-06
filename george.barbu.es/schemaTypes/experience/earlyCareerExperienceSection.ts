import { defineType } from 'sanity';

export default defineType({
  name: 'earlyCareerExperienceSection',
  title: 'Early Career Experience Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Early Career Experience'
    },
    {
      name: 'items',
      title: 'Early Career Experience',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'experience' }],
        options: { filter: 'earlyCareer == true' }
      }],
      validation: (Rule) => Rule.unique()
    }
  ]
});
