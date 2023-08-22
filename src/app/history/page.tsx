import { firestore } from '@/lib/firebase'
import { Container } from '@mui/material'
import { HistoryTable } from '@/containers'

export default async function page() {
  const historyRef = firestore.collection('history')
  const snapshot = await historyRef.get()

  const history: { local_time: string, location: string, id: string }[] = []
  snapshot.forEach((doc) => {
    history.push({ ...doc.data(), id: doc.id } as {
      id: string
      local_time: string
      location: string
    })
  })

  return (
    <Container maxWidth="sm" sx={{ p: 5 }}>
      <HistoryTable history={history} />
    </Container>
  )
}
