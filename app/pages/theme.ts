import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1687A7',
      contrastText: '#D3E0EA',
    },
    secondary: {
      main: '#4caf50',
    },
    background: {
      default: '#F6F5F5',
    },
    text: { primary: '#276678' },
  },
})

export default theme
