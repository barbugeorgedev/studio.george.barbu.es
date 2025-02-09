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
      of: [{type: 'social'}], // Use the newly created named schema
      options: {label: 'Social Profiles'},
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'cvpurpose',
      subtitle: 'role',
    },
  },
})
