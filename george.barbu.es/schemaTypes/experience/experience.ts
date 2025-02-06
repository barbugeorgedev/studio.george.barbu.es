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
        type: 'experienceDates',
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
  