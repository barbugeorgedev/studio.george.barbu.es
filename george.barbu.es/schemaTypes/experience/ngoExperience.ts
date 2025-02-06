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
      type: 'experienceDates' 
    },
    { name: 'responsibilities', type: 'array', title: 'Responsibilities', of: [{ type: 'string' }] }
  ]
};
