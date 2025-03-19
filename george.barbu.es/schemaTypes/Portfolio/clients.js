export default {
  name: 'client',
  title: 'Clients',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false}),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.min(10).max(20),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today',
      },
      initialValue: () => new Date().toISOString(),
    },
  ],
}
