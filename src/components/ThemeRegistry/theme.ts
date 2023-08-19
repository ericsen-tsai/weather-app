import { createTheme } from '@mui/material/styles'
import { blue, grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    secondary: grey,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },

})

export default theme
