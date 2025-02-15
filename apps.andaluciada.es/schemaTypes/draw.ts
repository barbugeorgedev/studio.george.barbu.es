import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'draw',
  type: 'document',
  title: 'Draw',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}}),
    defineField({name: 'numNumbers', type: 'number', title: 'Total Numbers'}),
    defineField({name: 'pricePerNumber', type: 'number', title: 'Price Per Number'}),
    defineField({name: 'header', type: 'text', title: 'Custom Header'}),
    defineField({name: 'footer', type: 'text', title: 'Custom Footer'}),
  ],
})
