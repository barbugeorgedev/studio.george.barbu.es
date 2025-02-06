export default {
    name: 'education',
    title: 'Education',
    type: 'document',
    fields: [
      { name: 'institution', type: 'string', title: 'Institution' },
      { name: 'degree', type: 'string', title: 'Degree' },
      { name: 'type', type: 'string', title: 'Type' },
      { name: 'certifications', type: 'array', title: 'Certifications', of: [{ type: 'string' }] }
    ]
  };