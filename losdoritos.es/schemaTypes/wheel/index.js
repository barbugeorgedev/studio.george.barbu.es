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
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (value) {
            const {getClient} = context
            const client = getClient({apiVersion: '2023-01-01'})
            const existingHomepage = await client.fetch(
              `*[_type == "wheel" && homepage == true && _id != $id][0]`,
              {id: context.document._id},
            )
            if (existingHomepage) {
              return 'Only one wheel can be set as the homepage.'
            }
          }
          return true
        }),
    },
  ],
  preview: {
    select: {
      title: 'wheelName',
      subtitle: 'slug.current',
      homepage: 'homepage',
    },
    prepare(selection) {
      const {title, subtitle, homepage} = selection
      return {
        title: title,
        subtitle: `${homepage ? '🏠 Homepage - ' : ''}${subtitle}`,
      }
    },
  },
}
