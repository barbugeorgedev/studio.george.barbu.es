import {defineType} from 'sanity'

export default defineType({
  name: 'summarySection',
  title: 'Summary Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
  ],
})
