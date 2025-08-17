import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

let theme = createTheme({
  palette: {
    primary: {
      main: '#007765',
      dark: '#005346',
      light: '#339283',
      contrastText: '#fff',
    },
    // mode: 'dark',
  },
})
theme = responsiveFontSizes(theme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
