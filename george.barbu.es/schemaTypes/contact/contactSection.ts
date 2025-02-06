import { defineType } from 'sanity';

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Contact Details'
    },
    {
      name: 'items',
      title: 'Contact Details',
      type: 'array',
      of: [{ type: 'contact' }],
    }    
  ]
});
