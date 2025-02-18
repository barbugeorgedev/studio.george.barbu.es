import {useEffect, useState} from 'react'
import {useToast} from '@sanity/ui'
import {Button, Card, Text, TextInput, Stack, Select} from '@sanity/ui'
import {apiURL, apiSecret} from '../../env'

export const ClearCacheAction = () => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState('1') // Default: last 1 day
  const [keyPattern, setKeyPattern] = useState('') // Custom pattern input
  const [availableKeys, setAvailableKeys] = useState<string[]>([]) // Dropdown options
  const [selectedKey, setSelectedKey] = useState<string>('') // Selected key

  // Fetch all keys when component mounts
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await fetch(`${apiURL}/api/cache/keys`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiSecret}`,
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        if (data.success) {
          setAvailableKeys(data.keys)
        } else {
          console.error('Error fetching keys:', data.message)
        }
      } catch (error) {
        console.error('Failed to fetch keys:', error)
      }
    }

    fetchKeys()
  }, [])

  const handleClearCache = async (mode: 'all' | 'days' | 'pattern' | 'dropdown') => {
    setLoading(true)
    try {
      const response = await fetch(`${apiURL}/api/cache/clear`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiSecret}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({mode, days, keyPattern, selectedKey}),
      })

      const data = await response.json()
      if (data.success) {
        toast.push({title: data.message, status: 'success'})

        if (mode === 'dropdown') {
          setAvailableKeys((prevKeys) => prevKeys.filter((key) => key !== selectedKey))
        }
      } else {
        toast.push({title: data.message, status: 'warning'})
      }
    } catch (error) {
      toast.push({title: 'Failed to clear cache', status: 'error'})
    }
    setLoading(false)
  }

  return (
    <Card padding={4}>
      <Stack space={3}>
        <Text size={2} weight="bold">
          Cache Management
        </Text>

        {/* Clear by Days */}
        <TextInput
          value={days}
          onChange={(e) => setDays(e.currentTarget.value)}
          placeholder="Days (e.g., 3 for last 3 days)"
        />
        <Button
          tone="caution"
          text={`Clear Cache from Last ${days || 'X'} Days`}
          loading={loading}
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to clear the cache for the last ${days || 'X'} days?`,
              )
            ) {
              handleClearCache('days')
            }
          }}
        />

        {/* Clear by Dropdown */}
        <Select value={selectedKey} onChange={(e) => setSelectedKey(e.currentTarget.value)}>
          <option value="">Select a key to delete</option>
          {availableKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Select>
        <Button
          tone="default"
          text="Delete Selected Key"
          loading={loading}
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete the cache for the selected key "${selectedKey}"?`,
              )
            ) {
              handleClearCache('dropdown')
            }
          }}
          disabled={!selectedKey}
        />

        {/* Clear by Pattern */}
        <TextInput
          value={keyPattern}
          onChange={(e) => setKeyPattern(e.currentTarget.value)}
          placeholder="Key pattern (e.g., wheelSpins:*)"
        />
        <Button
          tone="primary"
          text="Clear Specific Keys (Pattern)"
          loading={loading}
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to clear cache for the pattern "${keyPattern}"?`,
              )
            ) {
              handleClearCache('pattern')
            }
          }}
        />

        {/* Flush All */}
        <Button
          tone="critical"
          text="Flush All Cache"
          loading={loading}
          onClick={() => {
            if (
              window.confirm(
                'Are you sure you want to FLUSH ALL CACHE? This action is irreversible.',
              )
            ) {
              handleClearCache('all')
            }
          }}
        />
      </Stack>
    </Card>
  )
}
