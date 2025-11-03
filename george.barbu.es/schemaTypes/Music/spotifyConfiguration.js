export default {
  name: 'spotifyConfiguration',
  title: 'Spotify Configuration',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Enable Spotify Distribution',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'clientId',
      title: 'Client ID',
      type: 'string',
      description: 'Spotify API Client ID'
    },
    {
      name: 'clientSecret',
      title: 'Client Secret',
      type: 'string',
      description: 'Spotify API Client Secret',
      hidden: true
    },
    {
      name: 'redirectUri',
      title: 'Redirect URI',
      type: 'string',
      description: 'OAuth redirect URI'
    },
    {
      name: 'accessToken',
      title: 'Access Token',
      type: 'string',
      description: 'Current access token (auto-managed)',
      readOnly: true,
      hidden: true
    },
    {
      name: 'refreshToken',
      title: 'Refresh Token',
      type: 'string',
      description: 'Refresh token (auto-managed)',
      readOnly: true,
      hidden: true
    },
    {
      name: 'tokenExpiresAt',
      title: 'Token Expires At',
      type: 'datetime',
      description: 'When the access token expires (auto-managed)',
      readOnly: true,
      hidden: true
    },
    {
      name: 'tokenLastRefreshed',
      title: 'Token Last Refreshed',
      type: 'datetime',
      description: 'When the token was last automatically refreshed',
      readOnly: true,
      hidden: true
    },
    {
      name: 'tokenStatus',
      title: 'Token Status',
      type: 'string',
      description: 'Current token status (auto-managed)',
      readOnly: true,
      initialValue: 'not_configured',
      options: {
        list: [
          {title: 'Not Configured', value: 'not_configured'},
          {title: 'No Token', value: 'no_token'},
          {title: 'Valid', value: 'valid'},
          {title: 'Expired', value: 'expired'},
          {title: 'Refreshing', value: 'refreshing'},
          {title: 'Error', value: 'error'}
        ]
      }
    },
    {
      name: 'artistId',
      title: 'Spotify Artist ID',
      type: 'string',
      description: 'Your Spotify artist ID'
    },
    {
      name: 'label',
      title: 'Record Label',
      type: 'string',
      description: 'Label name for releases'
    }
  ]
}

