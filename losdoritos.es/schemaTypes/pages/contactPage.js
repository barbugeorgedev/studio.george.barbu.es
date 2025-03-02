export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Page Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}},
    {name: 'content', type: 'text', title: 'Page Content'},
  ],
}
