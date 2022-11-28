import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  // TODO:テーマを設定する
  palette: {
    primary: {
      main: '#009688',
      contrastText: '#795548',
    },
    background: {
      default: '#bdbdbd',
    },
    text: { primary: '#ff9800' },
  },
})

export default theme
