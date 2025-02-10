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
    }
  }

  return {
    label: 'Generate PDF',
    icon: DocumentTextIcon,
    onHandle: handleGeneratePdf,
  }
}
