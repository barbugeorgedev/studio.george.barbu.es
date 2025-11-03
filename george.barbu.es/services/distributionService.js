import {createClient} from '@sanity/client'
import {TokenManager} from './tokenManager'

const defaultClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'bet7jatc',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

export class DistributionService {
  constructor(client = defaultClient) {
    this.client = client
    this.tokenManager = new TokenManager(client)
  }

  async getDistributionSettings(personaId) {
    if (!personaId) {
      throw new Error('Persona ID is required to get distribution settings')
    }
    const persona = await this.client.fetch(
      `*[_type == "persona" && _id == $personaId][0]{
        _id,
        name,
        distribution
      }`,
      {personaId}
    )
    return persona?.distribution || null
  }

  async getSong(documentId) {
    const song = await this.client.fetch(
      `*[_id == $id][0]{
        _id,
        title,
        persona,
        "personaName": persona->name,
        audioFile,
        coverArt,
        duration,
        genre,
        lyrics,
        tags,
        releaseDate,
        bpm,
        key,
        distributionStatus
      }`,
      {id: documentId}
    )
    return song
  }

  async updateSongDistributionStatus(documentId, platform, status, url = null) {
    try {
      // Ensure distributionStatus object exists
      const updateData = {
        [`distributionStatus.${platform}.status`]: status,
        [`distributionStatus.${platform}.publishedAt`]: status === 'synced' ? new Date().toISOString() : null
      }
      
      if (url) {
        updateData[`distributionStatus.${platform}.url`] = url
      }
      
      // Initialize platform object if it doesn't exist
      const patch = this.client.patch(documentId)
      
      // Set the platform status
      patch.set({
        [`distributionStatus.${platform}.status`]: status
      })
      
      if (status === 'synced') {
        patch.set({
          [`distributionStatus.${platform}.publishedAt`]: new Date().toISOString()
        })
      }
      
      if (url) {
        patch.set({
          [`distributionStatus.${platform}.url`]: url
        })
      }
      
      await patch.commit()
      return {success: true}
    } catch (error) {
      console.error('Error updating song distribution status:', error)
      return {success: false, error: error.message}
    }
  }

  async uploadToSpotify(song) {
    if (!song.persona || !song.persona._ref) {
      throw new Error('Song must have an assigned persona to distribute')
    }

    const settings = await this.getDistributionSettings(song.persona._ref)
    
    if (!settings) {
      throw new Error('No distribution configuration found for this persona. Please configure distribution in the Persona settings.')
    }

    if (!settings.spotify?.enabled) {
      throw new Error('Spotify distribution is not enabled for this persona. Please enable it in Persona settings.')
    }

    if (!settings.spotify.clientId || !settings.spotify.clientSecret) {
      throw new Error('Spotify credentials are missing. Please configure them in Persona settings.')
    }

    // Automatically refresh token if needed
    try {
      await this.tokenManager.ensureValidToken(song.persona._ref, 'spotify')
    } catch (tokenError) {
      console.warn('Token refresh failed, continuing anyway:', tokenError.message)
    }

    // TODO: Implement actual Spotify upload via their API
    // This is a placeholder that simulates the upload process
    
    console.log('🎵 Uploading to Spotify:', song.title)
    
    // Simulate upload process
    await this.delay(2000)
    
    // In production, this would:
    // 1. Authenticate with Spotify API
    // 2. Upload audio file from Sanity
    // 3. Upload cover art if available
    // 4. Submit for distribution
    // 5. Get track ID and URL
    // 6. Update song document with status, URL, and track ID
    
    const mockResult = {
      status: 'uploading',
      url: null,
      trackId: null,
      uploadedAt: null
    }
    
    return mockResult
  }

  async uploadToYouTubeMusic(song) {
    if (!song.persona || !song.persona._ref) {
      throw new Error('Song must have an assigned persona to distribute')
    }

    const settings = await this.getDistributionSettings(song.persona._ref)
    
    if (!settings) {
      throw new Error('No distribution configuration found for this persona. Please configure distribution in the Persona settings.')
    }

    if (!settings.youtubeMusic?.enabled) {
      throw new Error('YouTube Music distribution is not enabled for this persona. Please enable it in Persona settings.')
    }

    if (!settings.youtubeMusic.clientId || !settings.youtubeMusic.clientSecret) {
      throw new Error('YouTube Music credentials are missing. Please configure them in Persona settings.')
    }

    // Automatically refresh token if needed
    try {
      await this.tokenManager.ensureValidToken(song.persona._ref, 'youtubeMusic')
    } catch (tokenError) {
      console.warn('Token refresh failed, continuing anyway:', tokenError.message)
    }

    console.log('🎵 Uploading to YouTube Music:', song.title)
    
    // TODO: Implement actual YouTube Music upload via their API
    // This is a placeholder that simulates the upload process
    
    await this.delay(2000)
    
    const mockResult = {
      status: 'uploading',
      url: null,
      videoId: null,
      uploadedAt: null
    }
    
    return mockResult
  }

  async uploadToYouTube(song) {
    if (!song.persona || !song.persona._ref) {
      throw new Error('Song must have an assigned persona to distribute')
    }

    const settings = await this.getDistributionSettings(song.persona._ref)
    
    if (!settings) {
      throw new Error('No distribution configuration found for this persona. Please configure distribution in the Persona settings.')
    }

    if (!settings.youtube?.enabled) {
      throw new Error('YouTube distribution is not enabled for this persona. Please enable it in Persona settings.')
    }

    if (!settings.youtube.apiKey || !settings.youtube.channelId) {
      throw new Error('YouTube credentials are missing. Please configure them in Persona settings.')
    }

    console.log('🎵 Uploading to YouTube:', song.title)
    
    // TODO: Implement actual YouTube upload via their API
    // This is a placeholder that simulates the upload process
    
    await this.delay(2000)
    
    const mockResult = {
      status: 'uploading',
      url: null,
      videoId: null,
      uploadedAt: null
    }
    
    return mockResult
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

