import { primaryLogoUrl } from '@/constants/common'
import { NAV_LIST } from '@/constants/nav'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  alpha,
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function SideBar({ user, pathname, onItemClick, logout }) {
  return (
    <Stack
      spacing={2}
      sx={{
        height: '100vh',
        bgcolor: '#111827', // bg-gray-900
        color: 'grey.200',
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 2, pt: 3 }}>
        <Box component="img" alt="logo" src={primaryLogoUrl} sx={{ width: 120, height: 'auto' }} />
      </Box>

      {/* Menu */}
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {NAV_LIST.map((item) => {
            const selected = pathname === item.path || pathname?.startsWith(item.path + '/')
            const Icon = item.icon
            return (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                selected={selected}
                onClick={onItemClick}
                sx={{
                  mb: 0.5,

                  color: 'grey.300',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                  },
                  '&.Mui-selected': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                    '*': {
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )
          })}
        </List>
      </Box>

      {/* User Info + Logout */}
      <Box sx={{ py: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5, px: 2 }}>
          <Avatar
            src={user?.avatar?.url || ''}
            alt={user?.fullName}
            sx={{
              width: 44,
              height: 44,
              bgcolor: 'primary.main',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {!user?.avatar && user?.fullName?.[0]}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: 'white', lineHeight: 1.2 }}
              noWrap
            >
              {user?.fullName || 'Nguyễn Văn An'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', lineHeight: 1.2 }} noWrap>
              {user?.role || 'admin'}
            </Typography>
          </Box>
        </Stack>

        <List disablePadding>
          <ListItemButton
            onClick={logout}
            sx={{
              color: 'grey.300',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItemButton>
        </List>
      </Box>
    </Stack>
  )
}
