export default {
  name: 'ngoExperience',
  title: 'NGO Experience',
  type: 'document',
  fields: [
    {name: 'company', type: 'string', title: 'Organization'},
    {name: 'role', type: 'string', title: 'Role'},
    {
      name: 'experienceDates',
      title: 'Experience Dates',
      type: 'experienceDates',
    },
    {name: 'duties', type: 'array', title: 'Responsibilities', of: [{type: 'string'}]},
  ],
}
