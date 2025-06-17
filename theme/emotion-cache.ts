// theme/emotion-cache.ts

'use client'

import createCache from '@emotion/cache'

// 👉 Création du cache Emotion avec un prefix MUI
export default function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true })
}
