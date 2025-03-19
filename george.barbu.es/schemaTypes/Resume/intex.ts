import {defineType} from 'sanity'
import {createClient} from '@sanity/client'

// Use the new `createClient` instead of the deprecated `sanityClient`
const client = createClient({
  useCdn: true,
  projectId: 'bet7jatc',
  dataset: 'production',
})

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    {
      name: 'cvpurpose',
      title: 'CV Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'cvpurpose',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'settings',
      title: 'Settings',
      type: 'reference',
      to: [{type: 'settings'}],
    },
    {
      name: 'seoSection',
      title: 'SEO Section',
      type: 'seoSection',
    },
    {
      name: 'mainImage',
      title: 'CV Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'fullname',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    },
    {
      name: 'summarySection',
      title: 'Summary Section',
      type: 'summarySection',
    },
    {
      name: 'skillsSections',
      title: 'Skills Sections',
      type: 'array',
      of: [{type: 'skillsSection'}],
    },
    {
      name: 'experienceSection',
      title: 'Experience Section',
      type: 'experienceSection',
    },
    {
      name: 'earlyCareerExperienceSection',
      title: 'Early Career Experience Section',
      type: 'earlyCareerExperienceSection',
    },
    {
      name: 'ngoExperienceSection',
      title: 'NGO Experience Section',
      type: 'ngoExperienceSection',
    },
    {
      name: 'educationSection',
      title: 'Education Section',
      type: 'educationSection',
    },
    {
      name: 'contactSection',
      title: 'Contact Section',
      type: 'contactSection',
    },
    {
      name: 'social',
      title: 'Social Profiles',
      type: 'array',
      of: [{type: 'social'}],
      options: {label: 'Social Profiles'},
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'homepage',
      type: 'boolean',
      title: 'Set as Homepage',
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (value) {
            const documentId = context.document?._id

            if (documentId) {
              // Query to check if another document with homepage = true exists, excluding the current one
              const existingHomepages = await client.fetch(
                `
              *[_type == "resume" && homepage == true && _id != $documentId] {
                _id
              }
            `,
                {documentId},
              )
              // If there is another resume set as homepage, show an error
              if (existingHomepages.length > 0) {
                return 'Only one resume can be set as the homepage'
              }
            }
          }

          // Allow if there's no conflict
          return true
        }),
    },
  ],
  preview: {
    select: {
      title: 'cvpurpose',
      subtitle: 'role',
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
})
