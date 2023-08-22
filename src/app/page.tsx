import { SearchPanel } from '@/containers'
import { Container } from '@mui/material'
import { type Metadata } from 'next'
// import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Fetch Weather',
  description: 'Fetch Weather',
}

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ p: 5 }}>
      <SearchPanel />
    </Container>
  )
}
