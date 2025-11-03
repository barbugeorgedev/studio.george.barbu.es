import {createClient} from '@sanity/client'

/**
 * Token Manager Service
 * Automatically manages OAuth access tokens and refresh tokens
 */
export class TokenManager {
  constructor(client) {
    this.client = client || createClient({
      projectId: 'bet7jatc',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2024-01-01'
    })
  }

  /**
   * Check if token needs refresh and refresh if necessary
   */
  async ensureValidToken(personaId, platform) {
    try {
      const persona = await this.client.fetch(
        `*[_id == $id][0]{
          _id,
          "distribution": distribution
        }`,
        {id: personaId}
      )

      if (!persona?.distribution) {
        throw new Error('Persona does not have distribution configuration')
      }

      const config = persona.distribution[platform]
      if (!config?.enabled) {
        throw new Error(`${platform} distribution is not enabled`)
      }

      const {accessToken, refreshToken, tokenExpiresAt, clientId, clientSecret, redirectUri} = config

      // Check if token exists and is still valid
      if (accessToken && tokenExpiresAt) {
        const expiresAt = new Date(tokenExpiresAt)
        const now = new Date()
        // Token is valid if it expires more than 5 minutes from now
        if (expiresAt.getTime() > (now.getTime() + 5 * 60 * 1000)) {
          return {accessToken, needsRefresh: false}
        }
      }

      // Token expired or doesn't exist, refresh it
      if (!refreshToken) {
        throw new Error(`No refresh token available for ${platform}. Please re-authenticate.`)
      }

      return await this.refreshToken(personaId, platform, {
        refreshToken,
        clientId,
        clientSecret,
        redirectUri
      })
    } catch (error) {
      console.error(`Error ensuring valid token for ${platform}:`, error)
      throw error
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(personaId, platform, {refreshToken, clientId, clientSecret, redirectUri}) {
    try {
      let tokenResponse

      if (platform === 'spotify') {
        tokenResponse = await this.refreshSpotifyToken(refreshToken, clientId, clientSecret)
      } else if (platform === 'youtubeMusic' || platform === 'youtube') {
        tokenResponse = await this.refreshYouTubeToken(refreshToken, clientId, clientSecret, redirectUri)
      } else {
        throw new Error(`Unsupported platform: ${platform}`)
      }

      const {access_token, refresh_token, expires_in} = tokenResponse

      // Calculate expiration time
      const expiresAt = new Date(Date.now() + (expires_in * 1000))

      // Update persona distribution config with new tokens
      const updatePath = `distribution.${platform}`
      await this.client
        .patch(personaId)
        .set({
          [`${updatePath}.accessToken`]: access_token,
          [`${updatePath}.refreshToken`]: refresh_token || refreshToken, // Use new refresh token if provided
          [`${updatePath}.tokenExpiresAt`]: expiresAt.toISOString(),
          [`${updatePath}.tokenLastRefreshed`]: new Date().toISOString()
        })
        .commit()

      console.log(`✅ Successfully refreshed ${platform} token for persona ${personaId}`)

      return {
        accessToken: access_token,
        refreshToken: refresh_token || refreshToken,
        expiresAt: expiresAt.toISOString(),
        needsRefresh: true
      }
    } catch (error) {
      console.error(`Error refreshing ${platform} token:`, error)
      throw error
    }
  }

  /**
   * Refresh Spotify access token
   */
  async refreshSpotifyToken(refreshToken, clientId, clientSecret) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Spotify token refresh failed: ${error}`)
    }

    return await response.json()
  }

  /**
   * Refresh YouTube/Google OAuth token
   */
  async refreshYouTubeToken(refreshToken, clientId, clientSecret, redirectUri) {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        redirect_uri: redirectUri
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`YouTube token refresh failed: ${error}`)
    }

    return await response.json()
  }

  /**
   * Get current valid access token (refreshes if needed)
   */
  async getAccessToken(personaId, platform) {
    const result = await this.ensureValidToken(personaId, platform)
    return result.accessToken
  }

  /**
   * Check token status
   */
  async getTokenStatus(personaId, platform) {
    try {
      const persona = await this.client.fetch(
        `*[_id == $id][0]{
          "distribution": distribution
        }`,
        {id: personaId}
      )

      const config = persona?.distribution?.[platform]
      if (!config) {
        return {status: 'not_configured', message: 'Platform not configured'}
      }

      if (!config.accessToken) {
        return {status: 'no_token', message: 'No access token. Please authenticate.'}
      }

      const expiresAt = config.tokenExpiresAt ? new Date(config.tokenExpiresAt) : null
      const now = new Date()

      if (!expiresAt) {
        return {status: 'unknown', message: 'Token expiry unknown'}
      }

      if (expiresAt <= now) {
        return {status: 'expired', message: 'Token has expired. Will refresh automatically.'}
      }

      const minutesUntilExpiry = Math.floor((expiresAt - now) / 60000)
      return {
        status: 'valid',
        message: `Token valid for ${minutesUntilExpiry} more minutes`,
        expiresAt: expiresAt.toISOString(),
        minutesUntilExpiry
      }
    } catch (error) {
      return {status: 'error', message: error.message}
    }
  }
}

