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
      name: 'playStoreLink',
      title: 'Play Store Link',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false}),
      hidden: ({document}) => {
        const categories = document?.categories || []
        return !categories.some((cat) => cat._ref === 'e0a78e44-b72c-4842-8591-fff7bc9f16cb') //this needs to be added to .environment file
      },
      description: 'Google Play Store URL for Android app',
    },
    {
      name: 'appStoreLink',
      title: 'App Store Link',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false}),
      hidden: ({document}) => {
        const categories = document?.categories || []
        return !categories.some((cat) => cat._ref === 'e7cbbfee-6520-4e29-ba22-6a60cb21347e') //this needs to be added to .environment file
      },
      description: 'Apple App Store URL for iOS app',
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
      name: 'objective',
      title: 'Objective',
      type: 'text',
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{type: 'block'}],
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
      validation: (Rule) => Rule.max(10),
    },
    {
      name: 'customLinks',
      title: 'Custom Links',
      type: 'array',
      of: [{type: 'customLink'}],
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
