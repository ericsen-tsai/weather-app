'use client'

import { styled } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from '@mui/material'
import { signIn, useSession } from 'next-auth/react'

import { tableCellClasses } from '@mui/material/TableCell'
import { useRouter } from 'next/navigation'
import { type History } from '@/types'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

type Props = {
  history: (Omit<History, 'created_at'> & { created_at: string })[]
}

export default function HistoryTable({ history }: Props) {
  const router = useRouter()
  const session = useSession()

  return (
    session.data
      ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Search Time</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.created_at}</StyledTableCell>
                  <StyledTableCell>{row.location}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={() => {
                        void router.push(`/?q=${row.location}`)
                      }}
                    >
                      Search!
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '80vh' }}>
          <Button variant="outlined" onClick={() => { void signIn() }}>Sign in first!</Button>
        </Stack>
      )
  )
}
