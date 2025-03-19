import {defineType} from 'sanity'

export default defineType({
  name: 'seoSection',
  title: 'SEO Section',
  type: 'object',
  fields: [
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for SEO purposes',
    },
    {
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      description: 'Keywords for SEO (comma-separated)',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique().min(1).error('At least one keyword is required.'),
    },
    {
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Short description for SEO purposes',
    },
  ],
})
