import { SunoSyncService } from '../../services/sunoSync'

export default function syncAction(props) {
  return {
    label: 'Sync with Suno AI',
    onHandle: async () => {
      const syncService = new SunoSyncService()
      await syncService.syncFromSuno()
    }
  }
} 