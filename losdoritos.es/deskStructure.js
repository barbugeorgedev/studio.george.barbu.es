export const wheelStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Wheel')
        .child(
          S.list()
            .title('Wheel Content')
            .items([
              S.documentTypeListItem('wheel').title('Wheels'),
              S.documentTypeListItem('slide').title('Slides'),
              S.documentTypeListItem('ad').title('Ads'),
              S.documentTypeListItem('settings').title('Settings'),
            ]),
        ),

      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Page Content')
            .items([
              S.documentTypeListItem('contentPage').title('Content Page'),
              S.documentTypeListItem('contactPage').title('Contact Page'),
            ]),
        ),

      S.listItem()
        .title('Layout')
        .child(
          S.list()
            .title('Layout Content')
            .items([
              S.documentTypeListItem('menu').title('Menus'),
              S.documentTypeListItem('header').title('Header'),
              S.documentTypeListItem('footer').title('Footer'),
            ]),
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !['wheel', 'slide', 'ad', 'settings', 'contactPage', 'header', 'footer', 'menu'].includes(
            item.getId(),
          ),
      ),
    ])
