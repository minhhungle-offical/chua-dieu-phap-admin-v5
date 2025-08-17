import { authStore } from '@/stores/authStore'
import { Box } from '@mui/material'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import BottomNav from '../Common/BottomNav'
import { Header } from '../Common/Header'
import SideBar from '../Common/SideBar'
import { useEffect } from 'react'
import { authApi } from '@/api/authApi'

export default function MainLayout({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const token = authStore((state) => state.token)
  const user = authStore((state) => state.user)

  console.log('user: ', user)

  useEffect(() => {
    ;(async () => {
      try {
        const user = await authApi.getMe()

        authStore.getState().setUser(user)
      } catch (error) {
        console.error(`${error}`)
      }
    })()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    authStore.getState().setToken('')
    navigate('/dang-nhap')
  }

  if (!token) {
    return <Navigate to="/dang-nhap" replace />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: 260,
          flexShrink: 0,
          backgroundColor: 'grey.900',
          boxShadow: 3,
        }}
      >
        <SideBar pathname={pathname} logout={logout} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: { md: 'none' } }}>
          <Header user={user} />
        </Box>

        <Box sx={{ flexGrow: 1 }}>{children}</Box>

        <Box sx={{ display: { md: 'none' } }}>
          <BottomNav pathname={pathname} navigate={navigate} logout={logout} />
        </Box>
      </Box>
    </Box>
  )
}
