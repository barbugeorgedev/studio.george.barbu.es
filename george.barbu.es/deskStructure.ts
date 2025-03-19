import {DocumentActionProps} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'
import {apiURL, webhookSecret, nextPublicURL} from './env'

export function GeneratePdfAction(props: DocumentActionProps) {
  if (!apiURL) {
    console.log('apiURL is not defined', apiURL)
  }

  if (!nextPublicURL) {
    console.log('nextPublicURL is not defined', nextPublicURL)
  }

  const handleGeneratePdf = async () => {
    console.log('📝 Triggering PDF generation for document:', props.id)

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
    text.innerText = 'Generating PDF...'
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
      document.body.removeChild(loadingMask)
    }
  }

  return {
    label: 'Generate PDF',
    icon: DocumentTextIcon,
    onHandle: handleGeneratePdf,
  }
}

export const studioStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Resume')
        .child(
          S.list()
            .title('Resume Content')
            .items([
              S.documentTypeListItem('resume').title('Resumes'),
              S.documentTypeListItem('experience').title('Experiences'),
              S.documentTypeListItem('ngoExperience').title('NGO Experiences'),
              S.documentTypeListItem('education').title('Education'),
              S.documentTypeListItem('skill').title('Skills'),
              S.documentTypeListItem('settings').title('Settings'),
            ]),
        ),

      S.listItem()
        .title('Portfolio')
        .child(
          S.list()
            .title('Portfolio Content')
            .items([
              S.documentTypeListItem('project').title('Projects'),
              S.documentTypeListItem('client').title('Clients'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('contactFormPortfolio').title('Contact Form'),
            ]),
        ),
    ])
