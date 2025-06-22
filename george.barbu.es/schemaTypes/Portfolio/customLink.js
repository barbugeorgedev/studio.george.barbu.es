export default {
  name: 'customLink',
  title: 'Custom Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false}).required(),
    },
    {
      name: 'icon',
      title: 'Icon (React Icon name)',
      type: 'string',
      description:
        'Example: "FiGithub", "SiFigma", "BsYoutube", https://react-icons.github.io/react-icons',
    },
  ],
}
