export default {
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
      { name: 'company', type: 'string', title: 'Company' },
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
      { name: 'duties', type: 'array', title: 'Duties', of: [{ type: 'string' }] },
      { name: 'skills', type: 'array', title: 'Skills', of: [{ type: 'reference', to: [{ type: 'skill' }] }]},
      { name: 'earlyCareer', type: 'boolean', title: 'Early Career', options: { layout: 'radio' }, initialValue: false }
    ],
    preview: {
      select: {
        title: 'role',
        subtitle: 'company'
      }
    }
  };
  