'use server'

import { firestore } from '@/lib/firebase'
import type { History } from '@/types'

// eslint-disable-next-line import/prefer-default-export
export const addHistory = async (history: Omit<History, 'id'>) => {
  const historyRef = firestore.collection('history')
  await historyRef.add(history)
}
