import { defineType } from 'sanity';

export default defineType({
  name: 'social',
  title: 'Social Profile',
  type: 'object',
  fields: [
    { name: 'service', type: 'string', title: 'Service' },
    { name: 'url', type: 'url', title: 'URL' }
  ]
});
