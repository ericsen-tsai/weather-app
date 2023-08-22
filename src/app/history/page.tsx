import { firestore } from '@/lib/firebase'
import { Container } from '@mui/material'
import { HistoryTable } from '@/containers'
import { type History } from '@/types'

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed in JS
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default async function page() {
  const historyRef = firestore.collection('history')
  const snapshot = await historyRef.get()

  const history: History[] = []
  snapshot.forEach((doc) => {
    history.push({ ...doc.data(), id: doc.id } as History)
  })

  return (
    <Container maxWidth="sm" sx={{ p: 5 }}>
      <HistoryTable
        history={history.map((item) => ({
          ...item,
          created_at: formatDate(item.created_at.toDate()),
        }))}
      />
    </Container>
  )
}
