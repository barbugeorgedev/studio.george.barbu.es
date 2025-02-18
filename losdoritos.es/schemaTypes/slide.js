export default {
  name: 'slide',
  title: 'Slide',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: '#ffffff',
    },
    {
      name: 'color',
      title: 'Slide Background',
      type: 'string',
      initialValue: '#ffffff',
    },
    {
      name: 'popupMessage',
      title: 'Pop-up Message',
      type: 'string',
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
    },
    {
      name: 'unpublishDate',
      title: 'Unpublish Date',
      type: 'datetime',
    },
    {
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      readOnly: true,
      description: 'Automatically set based on publish/unpublish dates',
    },
    {
      name: 'probability',
      title: 'Win Probability',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1),
      description:
        'Probability of landing on this slide (0 to 1). Must add up to 1 across all slides.',
    },
  ],
}
