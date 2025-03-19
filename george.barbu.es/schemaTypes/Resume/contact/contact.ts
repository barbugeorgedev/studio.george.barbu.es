import { defineType } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact Detail',
  type: 'object',
  fields: [
    {
      name: 'service',
      type: 'string',
      title: 'Service'
    },
    {
      name: 'value',
      type: 'string',
      title: 'Value'
    }
  ]
});
