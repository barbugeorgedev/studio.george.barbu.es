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
      name: 'label',
      type: 'string',
      title: 'Label'
    },
    {
      name: 'showLabel',
      type: 'boolean',
      title: 'Show Label',
      description: 'Display the Label string on the frontend',
      initialValue: false
    },
    {
      name: 'value',
      type: 'string',
      title: 'Value'
    }
  ]
});
