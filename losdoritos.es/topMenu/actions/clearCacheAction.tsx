import {useEffect, useState} from 'react'
import {useToast} from '@sanity/ui'
import {Button, Card, Text, TextInput, Stack, Select} from '@sanity/ui'
import {Redis} from '@upstash/redis'

const redis = new Redis({
  url: process.env.SANITY_STUDIO_UPSTASH_REDIS_REST_URL!,
  token: process.env.SANITY_STUDIO_UPSTASH_REDIS_REST_TOKEN!,
})

export const ClearCacheAction = () => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState('1') // Default: last 1 day
  const [keyPattern, setKeyPattern] = useState('') // Custom pattern input
  const [availableKeys, setAvailableKeys] = useState<string[]>([]) // Dropdown options
  const [selectedKey, setSelectedKey] = useState<string>('') // Selected key

  // 🔄 Fetch all keys when component mounts
  useEffect(() => {
    const fetchKeys = async () => {
      try {
        let cursor = '0'
        let allKeys: string[] = []

        do {
          const response = await redis.scan(cursor, {match: '*', count: 100})
          if (!response || !Array.isArray(response)) {
            throw new Error('Invalid response from Redis')
          }

          cursor = response[0] // Cursor (still a string)
          allKeys = [...allKeys, ...(response[1] ?? [])] // Ensure keys exist
        } while (cursor !== '0')

        setAvailableKeys(allKeys)
      } catch (error) {
        console.error('Failed to fetch keys:', error)
      }
    }

    fetchKeys()
  }, [])

  const handleClearCache = async (mode: 'all' | 'days' | 'pattern' | 'dropdown') => {
    setLoading(true)
    try {
      if (mode === 'all') {
        await redis.flushdb()
        toast.push({title: 'All cache cleared!', status: 'success'})
      } else {
        let keysToDelete: string[] = []

        if (mode === 'days') {
          const now = new Date()
          const daysAgo = new Date(now.setDate(now.getDate() - parseInt(days)))
          const formattedDate = daysAgo.toISOString().split('T')[0] // YYYY-MM-DD
          keysToDelete = await redis.keys(`*:${formattedDate}`)
        } else if (mode === 'pattern') {
          keysToDelete = await redis.keys(keyPattern)
        } else if (mode === 'dropdown' && selectedKey) {
          keysToDelete = [selectedKey] // Delete only the selected key
        }

        if (keysToDelete.length > 0) {
          await redis.del(...keysToDelete)
          toast.push({title: `${keysToDelete.length} cache entries deleted!`, status: 'success'})
          setAvailableKeys((prevKeys) => prevKeys.filter((key) => !keysToDelete.includes(key))) // Update dropdown
        } else {
          toast.push({title: 'No matching keys found.', status: 'warning'})
        }
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
                `Are you sure you want to clear the cache for the last ${days || 'X'} days? This action is irreversible.`,
              )
            ) {
              handleClearCache('days')
            }
          }}
        />

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
                `Are you sure you want to delete the cache for the selected key "${selectedKey}"? This action is irreversible.`,
              )
            ) {
              handleClearCache('dropdown')
            }
          }}
          disabled={!selectedKey}
        />

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
            const confirmationMessage = keyPattern
              ? `Are you sure you want to clear the cache for the pattern "${keyPattern}"? This action is irreversible.`
              : 'Are you sure you want to clear cache? This action is irreversible.'
            if (window.confirm(confirmationMessage)) {
              handleClearCache('pattern')
            }
          }}
        />

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
