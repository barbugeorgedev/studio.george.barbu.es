import {DistributionService} from '../../services/distributionService'
import {createClient} from '@sanity/client'
import {PlayIcon, RocketIcon, VideoIcon, MicrophoneIcon} from '@sanity/icons'

function createLoadingMask(message) {
  const loadingMask = document.createElement('div')
  loadingMask.style.position = 'fixed'
  loadingMask.style.top = '0'
  loadingMask.style.left = '0'
  loadingMask.style.width = '100vw'
  loadingMask.style.height = '100vh'
  loadingMask.style.background = 'rgba(0, 0, 0, 0.5)'
  loadingMask.style.display = 'flex'
  loadingMask.style.flexDirection = 'column'
  loadingMask.style.justifyContent = 'center'
  loadingMask.style.alignItems = 'center'
  loadingMask.style.color = 'white'
  loadingMask.style.fontSize = '20px'
  loadingMask.style.zIndex = '999'

  const spinner = document.createElement('div')
  spinner.style.border = '4px solid rgba(255, 255, 255, 0.3)'
  spinner.style.borderTop = '4px solid white'
  spinner.style.borderRadius = '50%'
  spinner.style.width = '40px'
  spinner.style.height = '40px'
  spinner.style.animation = 'spin 1s linear infinite'

  const text = document.createElement('div')
  text.innerText = message
  text.style.marginTop = '10px'

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'center'
  wrapper.appendChild(spinner)
  wrapper.appendChild(text)

  loadingMask.appendChild(wrapper)
  document.body.appendChild(loadingMask)

  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)

  return loadingMask
}

function removeLoadingMask(loadingMask) {
  if (loadingMask && document.body.contains(loadingMask)) {
    document.body.removeChild(loadingMask)
  }
}

// Helper function to check if persona has distribution configured for a platform
export async function checkPersonaDistribution(client, songId, platform) {
  try {
    const song = await client.fetch(
      `*[_id == $id][0]{
        persona,
        "personaDistribution": persona->distribution
      }`,
      {id: songId}
    )
    
    if (!song || !song.persona || !song.personaDistribution) {
      return false
    }
    
    const dist = song.personaDistribution
    
    switch (platform) {
      case 'spotify':
        return dist.spotify?.enabled === true && 
               dist.spotify?.clientId && 
               dist.spotify?.clientSecret
      case 'youtubeMusic':
        return dist.youtubeMusic?.enabled === true && 
               dist.youtubeMusic?.clientId && 
               dist.youtubeMusic?.clientSecret
      case 'youtube':
        return dist.youtube?.enabled === true && 
               dist.youtube?.apiKey && 
               dist.youtube?.channelId
      default:
        return false
    }
  } catch (error) {
    console.error('Error checking persona distribution:', error)
    return false
  }
}

export function UploadToSpotifyAction(props) {
  console.log('🎵 UploadToSpotifyAction called for document:', props.id)
  return {
    label: 'Publish to Spotify',
    icon: MicrophoneIcon,
    shortcut: 'mod+shift+s',
    tone: 'positive',
    onHandle: async () => {
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      // Check if persona has Spotify distribution configured
      const hasConfig = await checkPersonaDistribution(client, props.id, 'spotify')
      
      if (!hasConfig) {
        alert('❌ Spotify distribution is not configured for this song\'s persona. Please configure distribution settings in the Persona document.')
        return
      }

      const loadingMask = createLoadingMask('Publishing to Spotify...')
      
      const distributionService = new DistributionService(client)

      try {
        // Get song data
        const song = await distributionService.getSong(props.id)
        
        if (!song) {
          throw new Error('Could not find song document')
        }

        if (!song.audioFile) {
          throw new Error('Song must have an audio file to upload')
        }

        // Update song status to processing
        await distributionService.updateSongDistributionStatus(props.id, 'spotify', 'processing')
        
        // Upload to Spotify
        const result = await distributionService.uploadToSpotify(song)
        
        // Update song document with status and URL
        await distributionService.updateSongDistributionStatus(
          props.id, 
          'spotify', 
          'synced',
          result.url || null
        )

        alert('✅ Successfully published to Spotify!')
      } catch (error) {
        console.error('❌ Spotify upload error:', error)
        await distributionService.updateSongDistributionStatus(props.id, 'spotify', 'failed').catch(() => {})
        alert(`❌ Upload failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

export function UploadToYouTubeMusicAction(props) {
  return {
    label: 'Publish to YouTube Music',
    icon: PlayIcon,
    shortcut: 'mod+shift+y',
    tone: 'positive',
    onHandle: async () => {
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      // Check if persona has YouTube Music distribution configured
      const hasConfig = await checkPersonaDistribution(client, props.id, 'youtubeMusic')
      
      if (!hasConfig) {
        alert('❌ YouTube Music distribution is not configured for this song\'s persona. Please configure distribution settings in the Persona document.')
        return
      }

      const loadingMask = createLoadingMask('Publishing to YouTube Music...')
      
      const distributionService = new DistributionService(client)

      try {
        const song = await distributionService.getSong(props.id)
        
        if (!song) {
          throw new Error('Could not find song document')
        }

        if (!song.audioFile) {
          throw new Error('Song must have an audio file to upload')
        }

        await distributionService.updateSongDistributionStatus(props.id, 'youtubeMusic', 'processing')
        
        const result = await distributionService.uploadToYouTubeMusic(song)
        
        await distributionService.updateSongDistributionStatus(
          props.id, 
          'youtubeMusic', 
          'synced',
          result.url || null
        )

        alert('✅ Successfully published to YouTube Music!')
      } catch (error) {
        console.error('❌ YouTube Music upload error:', error)
        await distributionService.updateSongDistributionStatus(props.id, 'youtubeMusic', 'failed').catch(() => {})
        alert(`❌ Upload failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

export function UploadToYouTubeAction(props) {
  return {
    label: 'Publish to YouTube',
    icon: VideoIcon,
    shortcut: 'mod+shift+v',
    tone: 'positive',
    onHandle: async () => {
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      // Check if persona has YouTube distribution configured
      const hasConfig = await checkPersonaDistribution(client, props.id, 'youtube')
      
      if (!hasConfig) {
        alert('❌ YouTube distribution is not configured for this song\'s persona. Please configure distribution settings in the Persona document.')
        return
      }

      const loadingMask = createLoadingMask('Publishing to YouTube...')
      
      const distributionService = new DistributionService(client)

      try {
        const song = await distributionService.getSong(props.id)
        
        if (!song) {
          throw new Error('Could not find song document')
        }

        if (!song.audioFile) {
          throw new Error('Song must have an audio file to upload')
        }

        await distributionService.updateSongDistributionStatus(props.id, 'youtube', 'processing')
        
        const result = await distributionService.uploadToYouTube(song)
        
        await distributionService.updateSongDistributionStatus(
          props.id, 
          'youtube', 
          'synced',
          result.url || null
        )

        alert('✅ Successfully published to YouTube!')
      } catch (error) {
        console.error('❌ YouTube upload error:', error)
        await distributionService.updateSongDistributionStatus(props.id, 'youtube', 'failed').catch(() => {})
        alert(`❌ Upload failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

export function UploadToAllAction(props) {
  return {
    label: 'Publish to All Platforms',
    icon: RocketIcon,
    shortcut: 'mod+shift+a',
    tone: 'primary',
    onHandle: async () => {
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      // Check which platforms are configured
      const [hasSpotify, hasYouTubeMusic, hasYouTube] = await Promise.all([
        checkPersonaDistribution(client, props.id, 'spotify'),
        checkPersonaDistribution(client, props.id, 'youtubeMusic'),
        checkPersonaDistribution(client, props.id, 'youtube')
      ])

      // Check if at least one platform is configured
      if (!hasSpotify && !hasYouTubeMusic && !hasYouTube) {
        alert('❌ No distribution platforms are configured for this song\'s persona. Please configure at least one platform in the Persona distribution settings.')
        return
      }

      const loadingMask = createLoadingMask('Publishing to all configured platforms...')
      
      const distributionService = new DistributionService(client)

      try {
        const song = await distributionService.getSong(props.id)
        
        if (!song) {
          throw new Error('Could not find song document')
        }

        if (!song.audioFile) {
          throw new Error('Song must have an audio file to upload')
        }

        const results = {
          spotify: false,
          youtubeMusic: false,
          youtube: false
        }

        // Upload to Spotify (only if configured)
        if (hasSpotify) {
          try {
            await distributionService.updateSongDistributionStatus(props.id, 'spotify', 'processing')
            const result = await distributionService.uploadToSpotify(song)
            await distributionService.updateSongDistributionStatus(
              props.id, 
              'spotify', 
              'synced',
              result.url || null
            )
            results.spotify = true
          } catch (error) {
            console.error('Spotify upload failed:', error)
            await distributionService.updateSongDistributionStatus(props.id, 'spotify', 'failed').catch(() => {})
          }
        }

        // Upload to YouTube Music (only if configured)
        if (hasYouTubeMusic) {
          try {
            await distributionService.updateSongDistributionStatus(props.id, 'youtubeMusic', 'processing')
            const result = await distributionService.uploadToYouTubeMusic(song)
            await distributionService.updateSongDistributionStatus(
              props.id, 
              'youtubeMusic', 
              'synced',
              result.url || null
            )
            results.youtubeMusic = true
          } catch (error) {
            console.error('YouTube Music upload failed:', error)
            await distributionService.updateSongDistributionStatus(props.id, 'youtubeMusic', 'failed').catch(() => {})
          }
        }

        // Upload to YouTube (only if configured)
        if (hasYouTube) {
          try {
            await distributionService.updateSongDistributionStatus(props.id, 'youtube', 'processing')
            const result = await distributionService.uploadToYouTube(song)
            await distributionService.updateSongDistributionStatus(
              props.id, 
              'youtube', 
              'synced',
              result.url || null
            )
            results.youtube = true
          } catch (error) {
            console.error('YouTube upload failed:', error)
            await distributionService.updateSongDistributionStatus(props.id, 'youtube', 'failed').catch(() => {})
          }
        }

        const successCount = Object.values(results).filter(Boolean).length
        const platforms = Object.entries(results)
          .filter(([_, success]) => success)
          .map(([platform]) => platform)
          .join(', ')

        if (successCount === 0) {
          alert('❌ All uploads failed. Please check your credentials in Persona distribution settings.')
        } else {
          alert(`✅ Successfully published to ${successCount} platform(s): ${platforms}`)
        }
      } catch (error) {
        console.error('❌ Upload error:', error)
        alert(`❌ Upload failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

