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
      name: 'paymentMethod',
      type: 'string',
      title: 'Payment Method',
      options: {list: ['bank transfer', 'credit card', 'cash']},
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
      paymentMethod: 'paymentMethod',
    },
    prepare({title, status, number, paymentMethod}) {
      const numberList = number ? `[ ${number.join(', ')} ]` : 'No numbers'
      return {
        title,
        subtitle: `${status} - ${paymentMethod} - ${numberList}`,
      }
    },
  },
})
