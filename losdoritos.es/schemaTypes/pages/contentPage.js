export default {
  name: 'contentPage',
  title: 'Content Page',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Page Title'},
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'A unique URL-friendly identifier for the page.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      type: 'blockContent',
      title: 'Page Content',
    },
  ],
}
