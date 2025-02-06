export default {
    name: 'ngoExperience',
    title: 'NGO Experience',
    type: 'document',
    fields: [
      { name: 'organization', type: 'string', title: 'Organization' },
      { name: 'role', type: 'string', title: 'Role' },
      {
        name: 'experienceDates',
        title: 'Experience Dates',
        type: 'object',
        fieldsets: [
          {
            name: 'dates',
            title: 'Dates',
            options: { collapsible: true, collapsed: false }
          }
        ],
        fields: [
          {
            name: 'startDate',
            type: 'date',
            title: 'Start Date',
            fieldset: 'dates'
          },
          {
            name: 'endDate',
            type: 'date',
            title: 'End Date',
            fieldset: 'dates',
            hidden: ({ parent }: { parent?: { presentDate?: boolean } }) => parent?.presentDate === true
          },
          {
            name: 'presentDate',
            type: 'boolean',
            title: 'Present',
            options: { layout: 'radio' },
            initialValue: false,
            fieldset: 'dates'
          }
        ]
      },
      { name: 'responsibilities', type: 'array', title: 'Responsibilities', of: [{ type: 'string' }] }
    ]
  };
  