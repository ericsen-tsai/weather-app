import { SearchPanel } from '@/containers'
import { Container } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ p: 5 }}>
      <SearchPanel />
    </Container>
  )
}
