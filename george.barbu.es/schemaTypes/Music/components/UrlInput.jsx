import React from 'react'
import {LaunchIcon} from '@sanity/icons'

export default function UrlInput(props) {
  const {value, renderDefault} = props

  // Render the default input and wrap it with our button
  const inputElement = renderDefault(props)
  
  return (
    <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
      <div style={{flex: 1}}>
        {inputElement}
      </div>
      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px 12px',
            marginLeft: '8px',
            backgroundColor: '#2276fc',
            color: '#fff',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.2s',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1a5fd4'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2276fc'
          }}
        >
          <LaunchIcon style={{width: '16px', height: '16px', marginRight: '6px'}} />
          Open
        </a>
      )}
    </div>
  )
}

