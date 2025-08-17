import { useState } from 'react'
import { NAV_LIST } from '@/constants/nav'
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export default function BottomNav({ pathname, navigate, logout }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const visibleItems = NAV_LIST.slice(0, 2)
  const hiddenItems = NAV_LIST.slice(2)

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      <BottomNavigation
        showLabels
        value={pathname}
        onChange={(_, newValue) => {
          if (newValue === 'logout') {
            logout?.()
          } else if (newValue !== 'more') {
            navigate(newValue)
          }
        }}
      >
        {visibleItems.map((item) => {
          const Icon = item.icon
          return (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              value={item.path}
              icon={<Icon />}
            />
          )
        })}

        {hiddenItems.length > 0 && (
          <BottomNavigationAction
            label="Thêm"
            value="more"
            icon={<MoreHorizIcon />}
            onClick={handleMoreClick}
          />
        )}

        <BottomNavigationAction label="Đăng xuất" value="logout" icon={<LogoutIcon />} />
      </BottomNavigation>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {hiddenItems.map((item) => {
          const Icon = item.icon
          return (
            <MenuItem
              key={item.path}
              selected={pathname === item.path}
              onClick={() => {
                navigate(item.path)
                handleClose()
              }}
            >
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </MenuItem>
          )
        })}
      </Menu>
    </Paper>
  )
}
