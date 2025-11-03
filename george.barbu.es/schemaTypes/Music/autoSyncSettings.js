export default {
  name: 'autoSyncSettings',
  title: 'Auto Sync Settings',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Enable Auto-Sync',
      type: 'boolean',
      initialValue: false,
      description: 'Automatically upload songs to configured platforms'
    },
    {
      name: 'syncOnCreate',
      title: 'Sync on Creation',
      type: 'boolean',
      initialValue: true,
      description: 'Upload when song is first created'
    },
    {
      name: 'syncOnUpdate',
      title: 'Sync on Update',
      type: 'boolean',
      initialValue: false,
      description: 'Re-upload when song is updated'
    }
  ]
}

