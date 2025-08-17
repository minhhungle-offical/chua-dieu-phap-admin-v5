import { primaryLogoUrl } from '@/constants/common'
import { AppBar, Toolbar, Box, Stack, Typography, Avatar } from '@mui/material'

export const Header = ({ user }) => {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', color: 'black' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" alt="logo" src={primaryLogoUrl} sx={{ width: 64, height: 'auto' }} />
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Box>
            <Typography color="primary" fontWeight={600}>
              {user?.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="right" sx={{ opacity: 0.9 }}>
              {user?.role}
            </Typography>
          </Box>

          <Avatar
            src={user?.avatar?.url || ''}
            alt={user?.fullName}
            sx={{
              width: 42,
              height: 42,
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {!user?.avatar && user?.fullName?.[0]}
          </Avatar>
        </Stack>
      </Stack>
    </AppBar>
  )
}
