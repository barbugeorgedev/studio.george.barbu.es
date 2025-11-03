import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

export class SunoSyncService {
  async syncFromSuno() {
    // Fetch songs from Suno AI
    const sunoSongs = await this.fetchSunoSongs()
    
    for (const sunoSong of sunoSongs) {
      await this.processSunoSong(sunoSong)
    }
  }

  async fetchSunoSongs() {
    // Placeholder: Replace with actual Suno AI API call
    return []
  }

  async processSunoSong(sunoSong) {
    // Check if song already exists
    const existingSong = await client.fetch(
      `*[_type == "song" && sunoId == $sunoId][0]`,
      {sunoId: sunoSong.id}
    )

    if (existingSong) {
      // Update existing song
      await this.updateSong(existingSong._id, sunoSong)
    } else {
      // Create new song
      await this.createSong(sunoSong)
    }
  }

  async updateSong(songId, sunoSong) {
    // Placeholder: Implement update logic
    return client.patch(songId).set({ ...sunoSong }).commit()
  }

  async createSong(sunoSong) {
    // Upload audio file to Sanity
    const audioAsset = await client.assets.upload('file', sunoSong.audioBuffer, {
      filename: `${sunoSong.title}.mp3`
    })

    // Upload cover art if available
    let coverArtAsset = null
    if (sunoSong.coverArt) {
      coverArtAsset = await client.assets.upload('image', sunoSong.coverArtBuffer, {
        filename: `${sunoSong.title}-cover.jpg`
      })
    }

    // Find matching persona
    const persona = await this.findMatchingPersona(sunoSong)

    // Create song document
    const songDoc = {
      _type: 'song',
      title: sunoSong.title,
      slug: {
        _type: 'slug',
        current: sunoSong.title.toLowerCase().replace(/\s+/g, '-')
      },
      sunoId: sunoSong.id,
      audioFile: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: audioAsset._id
        }
      },
      coverArt: coverArtAsset ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: coverArtAsset._id
        }
      } : null,
      duration: sunoSong.duration,
      genre: sunoSong.genre,
      mood: sunoSong.tags || [],
      persona: {
        _type: 'reference',
        _ref: persona._id
      },
      syncStatus: 'synced',
      lyrics: sunoSong.lyrics,
      tags: sunoSong.tags,
      isPublic: true,
      releaseDate: new Date().toISOString(),
      bpm: sunoSong.bpm,
      key: sunoSong.key
    }

    return await client.create(songDoc)
  }

  async findMatchingPersona(sunoSong) {
    // Logic to match song to persona based on voice characteristics
    // This could use ML or rules-based matching
    const personas = await client.fetch(`*[_type == "persona" && isActive == true]`)
    
    // Default matching logic - you can enhance this
    return personas[0] || await this.createDefaultPersona()
  }

  async createDefaultPersona() {
    // Placeholder: Create a default persona if none exist
    const personaDoc = {
      _type: 'persona',
      name: 'Default Persona',
      isActive: true
    }
    return await client.create(personaDoc)
  }
} 