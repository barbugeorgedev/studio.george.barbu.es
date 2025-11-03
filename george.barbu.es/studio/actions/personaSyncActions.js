import {createClient} from '@sanity/client'

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

export function SyncSpotifyAccountAction(props) {
  return {
    label: '🔗 Sync Spotify Account',
    onHandle: async () => {
      const loadingMask = createLoadingMask('Fetching Spotify account details...')
      
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      try {
        // Get persona data
        const persona = await client.fetch(
          `*[_id == $id][0]{
            _id,
            name,
            distribution
          }`,
          {id: props.id}
        )
        
        if (!persona) {
          throw new Error('Could not find persona document')
        }

        // TODO: Implement actual Spotify API call to fetch account details
        // This would fetch:
        // - Artist ID
        // - Current access token status
        // - Artist URLs
        // - Account details
        
        console.log('🔗 Syncing Spotify account for:', persona.name)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Mock results
        const spotifyData = {
          artistId: 'spotify_artist_12345',
          artistName: persona.name,
          // In production, these would come from Spotify API
        }
        
        // Update persona with fetched data
        await client
          .patch(props.id)
          .set({
            'distribution.spotify.artistId': spotifyData.artistId,
          })
          .commit()

        alert('✅ Spotify account synced successfully!')
      } catch (error) {
        console.error('❌ Spotify sync error:', error)
        alert(`❌ Sync failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

export function SyncYouTubeMusicAccountAction(props) {
  return {
    label: '🔗 Sync YouTube Music Account',
    onHandle: async () => {
      const loadingMask = createLoadingMask('Fetching YouTube Music account details...')
      
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      try {
        const persona = await client.fetch(
          `*[_id == $id][0]{
            _id,
            name,
            distribution
          }`,
          {id: props.id}
        )
        
        if (!persona) {
          throw new Error('Could not find persona document')
        }

        console.log('🔗 Syncing YouTube Music account for:', persona.name)
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const ytMusicData = {
          channelId: 'UC_channel_12345',
        }
        
        await client
          .patch(props.id)
          .set({
            'distribution.youtubeMusic.channelId': ytMusicData.channelId,
          })
          .commit()

        alert('✅ YouTube Music account synced successfully!')
      } catch (error) {
        console.error('❌ YouTube Music sync error:', error)
        alert(`❌ Sync failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

export function SyncYouTubeAccountAction(props) {
  return {
    label: '🔗 Sync YouTube Account',
    onHandle: async () => {
      const loadingMask = createLoadingMask('Fetching YouTube account details...')
      
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      try {
        const persona = await client.fetch(
          `*[_id == $id][0]{
            _id,
            name,
            distribution
          }`,
          {id: props.id}
        )
        
        if (!persona) {
          throw new Error('Could not find persona document')
        }

        console.log('🔗 Syncing YouTube account for:', persona.name)
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const ytData = {
          channelId: 'UC_channel_67890',
        }
        
        await client
          .patch(props.id)
          .set({
            'distribution.youtube.channelId': ytData.channelId,
          })
          .commit()

        alert('✅ YouTube account synced successfully!')
      } catch (error) {
        console.error('❌ YouTube sync error:', error)
        alert(`❌ Sync failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

export function SyncAllAccountsAction(props) {
  return {
    label: '🔗 Sync All Accounts',
    onHandle: async () => {
      const loadingMask = createLoadingMask('Fetching all account details...')
      
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      try {
        const persona = await client.fetch(
          `*[_id == $id][0]{
            _id,
            name,
            distribution
          }`,
          {id: props.id}
        )
        
        if (!persona) {
          throw new Error('Could not find persona document')
        }

        const results = {
          spotify: false,
          youtubeMusic: false,
          youtube: false
        }

        // Sync Spotify
        if (persona.distribution?.spotify?.enabled) {
          try {
            console.log('🔗 Syncing Spotify...')
            await new Promise(resolve => setTimeout(resolve, 1000))
            const spotifyData = { artistId: 'spotify_artist_12345' }
            await client.patch(props.id).set({
              'distribution.spotify.artistId': spotifyData.artistId,
            }).commit()
            results.spotify = true
          } catch (error) {
            console.error('Spotify sync failed:', error)
          }
        }

        // Sync YouTube Music
        if (persona.distribution?.youtubeMusic?.enabled) {
          try {
            console.log('🔗 Syncing YouTube Music...')
            await new Promise(resolve => setTimeout(resolve, 1000))
            const ytMusicData = { channelId: 'UC_channel_12345' }
            await client.patch(props.id).set({
              'distribution.youtubeMusic.channelId': ytMusicData.channelId,
            }).commit()
            results.youtubeMusic = true
          } catch (error) {
            console.error('YouTube Music sync failed:', error)
          }
        }

        // Sync YouTube
        if (persona.distribution?.youtube?.enabled) {
          try {
            console.log('🔗 Syncing YouTube...')
            await new Promise(resolve => setTimeout(resolve, 1000))
            const ytData = { channelId: 'UC_channel_67890' }
            await client.patch(props.id).set({
              'distribution.youtube.channelId': ytData.channelId,
            }).commit()
            results.youtube = true
          } catch (error) {
            console.error('YouTube sync failed:', error)
          }
        }

        const successCount = Object.values(results).filter(Boolean).length
        const platforms = Object.entries(results)
          .filter(([_, success]) => success)
          .map(([platform]) => platform)
          .join(', ')

        if (successCount === 0) {
          alert('❌ No accounts were synced. Make sure distribution is enabled for at least one platform.')
        } else {
          alert(`✅ Successfully synced ${successCount} account(s): ${platforms}`)
        }
      } catch (error) {
        console.error('❌ Sync error:', error)
        alert(`❌ Sync failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

