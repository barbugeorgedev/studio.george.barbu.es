import { defineType } from 'sanity';

export default defineType({
  name: 'experienceDates',
  title: 'Experience Dates',
  type: 'object',
  fieldsets: [
    {
      name: 'dates',
      title: 'Dates',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    {
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
      fieldset: 'dates'
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End Date',
      fieldset: 'dates',
      hidden: ({ parent }) => parent?.presentDate === true
    },
    {
      name: 'presentDate',
      type: 'boolean',
      title: 'Present',
      options: { layout: 'radio' },
      initialValue: false,
      fieldset: 'dates'
    }
  ]
});
