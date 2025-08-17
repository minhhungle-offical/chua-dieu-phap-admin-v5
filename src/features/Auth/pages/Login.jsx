import { primaryLogoUrl } from '@/constants/common'
import { Box, Container, Dialog, DialogContent, Stack, Typography } from '@mui/material'
import { LoginForm } from '../components/LoginForm'
import { useState } from 'react'
import { VerifyOtpForm } from '../components/VerifyOtpForm'
import { authApi } from '@/api/authApi'
import { useSnackbar } from 'notistack'
import { authStore } from '@/stores/authStore'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const token = authStore((state) => state.token)

  const { enqueueSnackbar } = useSnackbar()

  const handleLogin = async (data) => {
    try {
      const res = await authApi.login(data)
      enqueueSnackbar('Login successfully!', { variant: 'success' })
      setEmail(res.email)
    } catch (error) {
      console.error(error)
      enqueueSnackbar(`${error}`, { variant: 'error' })
    }
  }

  const handleVerifyOtp = async (data) => {
    try {
      const { token } = await authApi.verifyOtp({ ...data, email })
      enqueueSnackbar('Login successfully!', { variant: 'success' })
      localStorage.setItem('token', token)
      authStore.getState().setToken(token)
    } catch (error) {
      console.error(error)
      enqueueSnackbar(`${error}`, { variant: 'error' })
    }
  }
  if (token) {
    return <Navigate to="/quan-ly" replace />
  }

  return (
    <Container maxWidth="sm">
      <Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <Box
          width="100%"
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Stack justifyContent="center" alignItems="center" spacing={3}>
            <Box width={100}>
              <Box component="img" alt="logo" src={primaryLogoUrl} />
            </Box>
            <Box>
              <Typography variant="h4" textAlign="center" fontWeight={600}>
                Đăng nhập tài khoản
              </Typography>
            </Box>
            <Box width="100%">
              <LoginForm onSubmit={handleLogin} />
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Dialog fullWidth maxWidth="sm" open={!!email}>
        <Stack justifyContent="center" alignItems="center" spacing={3} p={3}>
          <Box width={100}>
            <Box component="img" alt="logo" src={primaryLogoUrl} />
          </Box>

          <Box>
            <Typography variant="h4" textAlign="center" fontWeight={600}>
              Xác thực tài khoản
            </Typography>
          </Box>
          <Box width="100%">
            <VerifyOtpForm onSubmit={handleVerifyOtp} />
          </Box>
        </Stack>
      </Dialog>
    </Container>
  )
}
