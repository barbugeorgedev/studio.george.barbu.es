import React, {useEffect, useRef} from 'react'
import {useFormValue} from 'sanity'

export default function AudioFileInput(props) {
  const {value, renderDefault, onPathChange} = props
  const hasExtractedRef = useRef(false)
  const extractingRef = useRef(false)
  const documentId = useFormValue(['_id'])
  const currentDuration = useFormValue(['duration'])
  
  useEffect(() => {
    const extractDuration = async () => {
      if (!value?.asset?._ref || !documentId || hasExtractedRef.current || extractingRef.current) return
      
      // Check if duration already exists and is valid
      if (currentDuration && currentDuration > 0) {
        hasExtractedRef.current = true
        return
      }
      
      extractingRef.current = true
      
      try {
        // First, try to get the asset document to get the actual URL
        const {createClient} = await import('@sanity/client')
        const client = createClient({
          projectId: 'bet7jatc',
          dataset: 'production',
          useCdn: false,
          apiVersion: '2024-01-01'
        })
        
        let assetUrl = null
        
        // Try to get asset URL from various sources
        // Method 1: Check if asset has URL property directly (from Studio resolver)
        if (value.asset?.url) {
          assetUrl = value.asset.url
        }
        
        // Method 2: Fetch the asset document
        if (!assetUrl) {
          try {
            const assetDoc = await client.fetch(
              `*[_id == $id][0]{
                url,
                originalFilename,
                mimeType
              }`,
              {id: value.asset._ref}
            )
            if (assetDoc?.url) {
              assetUrl = assetDoc.url
            } else if (assetDoc) {
              // Construct URL from asset ID if url not available
              const assetId = value.asset._ref.replace(/^file-/, '')
              // Sanity file URLs follow pattern: https://cdn.sanity.io/files/{project}/{dataset}/{assetId}
              assetUrl = `https://cdn.sanity.io/files/bet7jatc/production/${assetId}`
            }
          } catch (fetchError) {
            console.warn('Could not fetch asset document:', fetchError)
          }
        }
        
        // Method 3: Construct URL manually as fallback
        if (!assetUrl && value.asset._ref) {
          const assetId = value.asset._ref.replace(/^file-/, '')
          assetUrl = `https://cdn.sanity.io/files/bet7jatc/production/${assetId}`
        }
        
        if (!assetUrl) {
          console.error('Could not determine asset URL')
          extractingRef.current = false
          return
        }
        
        console.log('Extracting duration from:', assetUrl)
        
        // Create audio element to get duration
        const audio = new Audio()
        audio.preload = 'metadata'
        audio.crossOrigin = 'anonymous'
        
        const handleLoadedMetadata = async () => {
          const duration = Math.round(audio.duration)
          console.log('Extracted duration:', duration, 'seconds')
          
          if (duration && duration > 0 && duration !== currentDuration) {
            hasExtractedRef.current = true
            
            try {
              // Method 1: Use onPathChange if available (updates form state directly)
              if (onPathChange) {
                onPathChange(['duration'], duration)
                console.log('✅ Successfully updated duration via onPathChange:', duration, 'seconds')
              } else {
                // Method 2: Use direct client patch
                await client
                  .patch(documentId)
                  .set({duration})
                  .commit()
                console.log('✅ Successfully updated duration via client patch:', duration, 'seconds')
                
                // Force a form refresh by triggering a change event
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('sanity:field-update', {
                    detail: {field: 'duration', value: duration}
                  }))
                }
              }
            } catch (patchError) {
              console.error('❌ Error updating duration:', patchError)
            }
          }
          
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
          audio.removeEventListener('error', handleError)
          extractingRef.current = false
        }
        
        const handleError = (e) => {
          console.warn('Could not extract duration from audio file:', e)
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
          audio.removeEventListener('error', handleError)
          extractingRef.current = false
        }
        
        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('error', handleError)
        
        // Set timeout to prevent hanging
        const timeout = setTimeout(() => {
          console.warn('Timeout waiting for audio metadata')
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
          audio.removeEventListener('error', handleError)
          extractingRef.current = false
        }, 10000)
        
        audio.addEventListener('loadedmetadata', () => {
          clearTimeout(timeout)
        })
        
        audio.addEventListener('error', () => {
          clearTimeout(timeout)
        })
        
        audio.src = assetUrl
      } catch (error) {
        console.error('Error extracting audio duration:', error)
        extractingRef.current = false
      }
    }
    
    extractDuration()
  }, [value?.asset?._ref, documentId, currentDuration, onPathChange])
  
  return renderDefault(props)
}

