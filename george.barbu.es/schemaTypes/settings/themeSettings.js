const colorList = [
  '#313638',
  '#525659',
  '#571926',
  '#FFFFFF',
  '#7f2437',
  '#e5e5e5',
  '#000000',
  '#232323',
]

export default {
  name: 'themeSettings',
  title: 'Theme Settings',
  type: 'object',
  fields: [
    {
      name: 'headerIconsColor',
      title: 'Header Icons Color',
      type: 'color',
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainBackground',
      title: 'Main Background',
      type: 'color',
      initialValue: {hex: '#525659', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'headerBackground',
      title: 'Header Background',
      type: 'color',
      initialValue: {hex: '#571926', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'headerTextColor',
      title: 'Header Text Color',
      type: 'color',
      initialValue: {hex: '#FFFFFF', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'sidebarBackground',
      title: 'Sidebar Background',
      type: 'color',
      initialValue: {hex: '#313638', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'sidebarSectionTextColor',
      title: 'Sidebar Section Text Color',
      type: 'color',
      initialValue: {hex: '#7f2437', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'sidebarTextColor',
      title: 'Sidebar Text Color',
      type: 'color',
      initialValue: {hex: '#e5e5e5', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainTextColor',
      title: 'Main Text Color',
      type: 'color',
      initialValue: {hex: '#000000', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainSectionBackground',
      title: 'Main Section Background',
      type: 'color',
      initialValue: {hex: '#FFFFFF', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainSectionDotColor',
      title: 'Main Section Dot Color',
      type: 'color',
      initialValue: {hex: '#571926', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainSectionLineColor',
      title: 'Main Section Line Color',
      type: 'color',
      initialValue: {hex: '#571926', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainSectionTextColor',
      title: 'Main Section Text Color',
      type: 'color',
      initialValue: {hex: '#571926', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainSectionPrimaryTextColor',
      title: 'Main Section Primary Text Color',
      type: 'color',
      initialValue: {hex: '#571926', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'mainSectionSecondaryTextColor',
      title: 'Main Section Secondary Text Color',
      type: 'color',
      initialValue: {hex: '#232323', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'footerTextColor',
      title: 'Footer Text Color',
      type: 'color',
      initialValue: {hex: '#313638', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'footerIconsColor',
      title: 'Footer Icons Color',
      type: 'color',
      initialValue: {hex: '#313638', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
    {
      name: 'footerLinkColor',
      title: 'Footer Link Color',
      type: 'color',
      initialValue: {hex: '#571926', alpha: 1},
      options: {
        colorList,
        disableAlpha: true,
      },
    },
  ],
}
