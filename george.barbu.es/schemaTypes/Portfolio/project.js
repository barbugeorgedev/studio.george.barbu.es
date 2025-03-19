export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{type: 'client'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false}),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
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
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'objective',
      title: 'Objective',
      type: 'text',
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'galleryItem'}],
      validation: (Rule) => Rule.max(3),
    },
  ],
  preview: {
    select: {
      title: 'title',
      clientLogo: 'client.logo.asset.url',
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.defaultImage
          ? {asset: {url: selection.defaultImage}}
          : selection.clientLogo
            ? {asset: {url: selection.clientLogo}}
            : undefined,
      }
    },
  },
}
