import {DocumentActionProps} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons' // Importing an icon

export function GeneratePdfAction(props: DocumentActionProps) {
  const handleGeneratePdf = async () => {
    try {
      await fetch(`/api/generate-pdf?documentId=${props.id}`, {
        method: 'POST',
      })
      alert('PDF generation triggered!')
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return {
    label: 'Generate PDF',
    icon: DocumentTextIcon, // Adding the icon
    onHandle: handleGeneratePdf,
  }
}
