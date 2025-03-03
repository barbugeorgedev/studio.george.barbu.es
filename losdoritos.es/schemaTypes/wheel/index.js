import {defineField} from 'sanity'

export default {
  name: 'wheel',
  title: 'Wheel',
  type: 'document',
  fields: [
    {
      name: 'wheelName',
      title: 'Wheel Name',
      type: 'string',
    },
    {
      name: 'frontWheelName',
      title: 'On page Wheel Name',
      type: 'string',
    },
    {
      name: 'wheelImage',
      title: 'Wheel Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'wheelName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for SEO purposes',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Short description for SEO purposes',
    },
    {
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'settings',
      title: 'Settings',
      type: 'reference',
      to: [{type: 'settings'}],
    },
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'slide'}]}],
    },
    {
      name: 'homepage',
      type: 'boolean',
      title: 'Set as Homepage',
    },
  ],
  preview: {
    select: {
      title: 'wheelName',
      subtitle: 'slug.current',
      homepage: 'homepage',
      image: 'wheelImage',
    },
    prepare(selection) {
      const {title, subtitle, homepage, image} = selection
      return {
        title: title,
        subtitle: `${homepage ? '🏠 Homepage - ' : ''}${subtitle}`,
        media: image ? image : null,
      }
    },
  },
}
