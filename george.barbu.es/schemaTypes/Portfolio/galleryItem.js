export default {
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'isDefault',
      title: 'Default Image',
      type: 'boolean',
      description: 'Set this image as the default',
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      isDefault: 'isDefault',
    },
    prepare(selection) {
      return {
        title: selection.isDefault ? 'Default Gallery Image' : 'Gallery Image',
        media: selection.imageUrl ? {asset: {url: selection.imageUrl}} : undefined,
      }
    },
  },
}
