import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'emailTemplate',
  type: 'document',
  title: 'Email Template',
  fields: [
    defineField({name: 'name', type: 'string', title: 'Template Name'}),
    defineField({name: 'subject', type: 'string', title: 'Email Subject'}),
    defineField({name: 'body', type: 'text', title: 'Email Body'}),
  ],
})
