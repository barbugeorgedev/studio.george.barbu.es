import { defineType } from 'sanity';

export default defineType({
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
      {
        name: 'cvpurpose',
        title: 'CV Name',
        type: 'string'
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
        type: 'string'
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string'
      },
      {
        name: 'slogan',
        title: 'Slogan',
        type: 'string'
      },
      {
        name: 'summary',
        title: 'Summary',
        type: 'text',
        options: { label: 'Summary' }
      },
      {
        name: 'skillsSections',
        title: 'Skills Sections',
        type: 'array',
        of: [
          {
            type: 'object',
            title: 'Skills Section',
            fields: [
              {
                name: 'label',
                title: 'Section Label',
                type: 'string',
                initialValue: 'Skills'
              },
              {
                name: 'items',
                title: 'Skills',
                type: 'array',
                of: [{ type: 'reference', to: [{ type: 'skill' }] }],
                validation: (Rule: any) => Rule.unique()
              }
            ]
          }
        ]
      },
      {
        name: 'experienceSection',
        title: 'Experience Section',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Section Label',
            type: 'string',
            initialValue: 'Experience'
          },
          {
            name: 'items',
            title: 'Professional Experience',
            type: 'array',
            of: [{ 
                type: 'reference', 
                to: [{ type: 'experience' }],
                options: { filter: 'earlyCareer == false' }
              }],
            validation: (Rule: any) => Rule.unique()
          }
        ]
      },
      {
        name: 'earlyCareerExperienceSection',
        title: 'Early Career Experience Section',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Section Label',
            type: 'string',
            initialValue: 'Early Career Experience'
          },
          {
            name: 'items',
            title: 'Early Career Experience',
            type: 'array',
            of: [{ 
              type: 'reference', 
              to: [{ type: 'experience' }],
              options: { filter: 'earlyCareer == true' }
            }],
            validation: (Rule: any) => Rule.unique()
          }
        ]
      },

      {
        name: 'ngoExperienceSection',
        title: 'NGO Experience Section',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Section Label',
            type: 'string',
            initialValue: 'NGO Experience'
          },
          {
            name: 'items',
            title: 'NGO Experience',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'ngoExperience' }] }],
            validation: (Rule: any) => Rule.unique()
          }
        ]
      },

      {
        name: 'educationSection',
        title: 'Education Section',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Section Label',
            type: 'string',
            initialValue: 'Education'
          },
          {
            name: 'items',
            title: 'Education History',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'education' }] }],
            validation: (Rule: any) => Rule.unique()
          }
        ]
      },

      {
        name: 'contactSection',
        title: 'Contact Section',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Section Label',
            type: 'string',
            initialValue: 'Contact Details'
          },
          {
            name: 'items',
            title: 'Contact Details',
            type: 'array',
            of: [{ type: 'object', name: 'contact', fields: [
                { name: 'service', type: 'string', title: 'Service' },
                { name: 'value', type: 'string', title: 'Value' }
              ] }],
            options: { label: 'Social Profiles' },
            validation: (Rule: any) => Rule.unique()
          }
        ]
      },

      {
        name: 'social',
        title: 'Social Profiles',
        type: 'array',
        of: [{ type: 'object', name: 'social', fields: [
          { name: 'service', type: 'string', title: 'Service' },
          { name: 'url', type: 'url', title: 'URL' }
        ] }],
        options: { label: 'Social Profiles' },
        validation: (Rule: any) => Rule.unique()
      }
    ],
    preview: {
      select: {
        title: 'cvpurpose',
        subtitle: 'role'
      }
    }
});
