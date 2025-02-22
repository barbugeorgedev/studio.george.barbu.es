import {defineType} from 'sanity'

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
    {name: 'experienceSection', title: 'Experience Section', type: 'experienceSection'},
    {
      name: 'earlyCareerExperienceSection',
      title: 'Early Career Experience Section',
      type: 'earlyCareerExperienceSection',
    },
    {name: 'ngoExperienceSection', title: 'NGO Experience Section', type: 'ngoExperienceSection'},
    {name: 'educationSection', title: 'Education Section', type: 'educationSection'},
    {name: 'contactSection', title: 'Contact Section', type: 'contactSection'},
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
