import {DocumentActionProps} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export function GeneratePdfAction(props: DocumentActionProps) {
  const apiUrl = process.env.API_URL
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    console.log('API_URL is not defined')
  }

  if (!publicApiUrl) {
    console.log('NEXT_PUBLIC_API_URL is not defined')
  }

  const handleGeneratePdf = async () => {
    console.log('📝 Triggering PDF generation for document:', props.id)

    try {
      const response = await fetch(`${process.env.API_URL}/api/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-sanity-secret': process.env.SANITY_WEBHOOK_SECRET || '',
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
