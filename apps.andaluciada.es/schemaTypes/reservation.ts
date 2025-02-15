import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'reservation',
  type: 'document',
  title: 'Reservation',
  fields: [
    defineField({name: 'draw', type: 'reference', to: [{type: 'draw'}]}),
    defineField({name: 'userPhone', type: 'string', title: 'Phone Number'}),
    defineField({name: 'number', type: 'array', of: [{type: 'number'}]}),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {list: ['reserved', 'paid']},
    }),
    defineField({
      name: 'reservedAt',
      type: 'datetime',
      title: 'Reserved At',
      description: 'Timestamp of when the reservation was made',
    }),
  ],
  preview: {
    select: {
      title: 'userPhone',
      status: 'status',
      number: 'number',
    },
    prepare({title, status, number}) {
      const numberList = number ? `[ ${number.join(', ')} ]` : 'No numbers'
      return {
        title,
        subtitle: `${status} - ${numberList}`,
      }
    },
  },
})
