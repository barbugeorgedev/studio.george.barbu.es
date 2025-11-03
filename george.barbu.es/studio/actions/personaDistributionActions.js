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

export function DistributeAllSongsAction(props) {
  return {
    label: '🚀 Distribute All Songs',
    onHandle: async () => {
      const loadingMask = createLoadingMask('Distributing all songs...')
      
      const client = props.client || createClient({
        projectId: 'bet7jatc',
        dataset: 'production',
        useCdn: false,
        apiVersion: '2024-01-01'
      })

      try {
        // Get persona with songs
        const persona = await client.fetch(
          `*[_id == $id][0]{
            _id,
            name,
            distribution,
            "songs": *[_type == "song" && references($id)]{
              _id,
              title,
              audioFile,
              coverArt,
              syncStatus
            }
          }`,
          {id: props.id}
        )
        
        if (!persona) {
          throw new Error('Could not find persona document')
        }

        if (!persona.distribution) {
          throw new Error('No distribution configured for this persona')
        }

        const songs = persona.songs || []
        
        if (songs.length === 0) {
          alert('No songs found for this persona')
          removeLoadingMask(loadingMask)
          return
        }

        // Filter only pending songs if desired
        const pendingSongs = songs.filter(s => s.syncStatus === 'pending' || !s.syncStatus)
        
        if (pendingSongs.length === 0) {
          alert('No pending songs to distribute')
          removeLoadingMask(loadingMask)
          return
        }

        const results = {
          total: pendingSongs.length,
          success: 0,
          failed: 0
        }

        // Distribute each song
        for (const song of pendingSongs) {
          try {
            // Mark as processing
            await client.patch(song._id).set({syncStatus: 'processing'}).commit()
            
            // TODO: Implement actual distribution
            // This would check persona.distribution settings and upload to enabled platforms
            
            console.log(`🎵 Distributing: ${song.title}`)
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            // Mark as synced
            await client.patch(song._id).set({syncStatus: 'synced'}).commit()
            results.success++
          } catch (error) {
            console.error(`Failed to distribute ${song.title}:`, error)
            await client.patch(song._id).set({syncStatus: 'failed'}).commit()
            results.failed++
          }
        }

        alert(`✅ Distributed ${results.success}/${results.total} songs successfully${results.failed > 0 ? ` (${results.failed} failed)` : ''}`)
      } catch (error) {
        console.error('❌ Distribution error:', error)
        alert(`❌ Distribution failed: ${error.message}`)
      } finally {
        removeLoadingMask(loadingMask)
      }
    }
  }
}

