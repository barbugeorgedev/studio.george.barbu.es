import {DocumentActionProps} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {apiURL, webhookSecret, nextPublicURL} from './environment'

export function GeneratePdfAction(props: DocumentActionProps) {
  if (!apiURL) {
    console.log('apiURL is not defined', apiURL)
  }

  if (!nextPublicURL) {
    console.log('nextPublicURL is not defined', nextPublicURL)
  }

  const handleGeneratePdf = async () => {
    console.log('📝 Triggering PDF generation for document:', props.id)

    // Create loading mask
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

    // Create spinner
    const spinner = document.createElement('div')
    spinner.style.border = '4px solid rgba(255, 255, 255, 0.3)'
    spinner.style.borderTop = '4px solid white'
    spinner.style.borderRadius = '50%'
    spinner.style.width = '40px'
    spinner.style.height = '40px'
    spinner.style.animation = 'spin 1s linear infinite'

    // Create text
    const text = document.createElement('div')
    text.innerText = 'Generating PDF...'
    text.style.marginTop = '10px'

    // Wrap spinner and text together
    const wrapper = document.createElement('div')
    wrapper.style.display = 'flex'
    wrapper.style.flexDirection = 'column'
    wrapper.style.alignItems = 'center'
    wrapper.appendChild(spinner)
    wrapper.appendChild(text)

    // Add wrapper to loading mask
    loadingMask.appendChild(wrapper)
    document.body.appendChild(loadingMask)

    // Add keyframes for spinner animation
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)

    try {
      const response = await fetch(`${apiURL}/api/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-sanity-secret': webhookSecret || '',
        },
        body: JSON.stringify({documentId: props.id}),
      })

      const data = await response.json()
      console.log('📩 API response:', data)

      if (!response.ok) {
        throw new Error(data.error || 'PDF generation failed')
      }

      alert('✅ PDF generation triggered successfully!')
    } catch (error) {
      console.error('❌ Error generating PDF:', error)
      alert('❌ PDF generation failed! Check logs for details.')
    } finally {
      // Remove loading mask after request completes
      document.body.removeChild(loadingMask)
    }
  }

  return {
    label: 'Generate PDF',
    icon: DocumentTextIcon,
    onHandle: handleGeneratePdf,
  }
}
