export const JOB_TYPE_TRANSLATIONS = {
  'full_time': 'Temps plein',
  'part_time': 'Temps partiel',
  'contract': 'Contrat',
  'internship': 'Stage'
}

export const REMOTE_TYPE_TRANSLATIONS = {
  'onsite': 'Sur site',
  'remote': 'Télétravail',
  'hybrid': 'Hybride'
}

export function translateJobType(type: string): string {
  return JOB_TYPE_TRANSLATIONS[type as keyof typeof JOB_TYPE_TRANSLATIONS] || type
}

export function translateRemoteType(type: string): string {
  return REMOTE_TYPE_TRANSLATIONS[type as keyof typeof REMOTE_TYPE_TRANSLATIONS] || type
}
