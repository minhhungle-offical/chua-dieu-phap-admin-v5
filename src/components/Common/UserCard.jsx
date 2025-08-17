import bg from '@/assets/cover-6.webp'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { Avatar, Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'

export function UserCard({ user, onEdit, onRemove }) {
  if (!user) return null

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        transition: '0.3s',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',

          color: 'white',
          aspectRatio: '16/9',
        }}
      >
        <Stack
          alignItems="flex-end"
          sx={{ width: '100%', height: '100%', p: 2, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <Box>
            {' '}
            <IconButton color="inherit" onClick={() => onEdit?.(user)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box>
            <IconButton color="inherit" onClick={() => onRemove?.(user)}>
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Stack justifyContent="center" alignItems="center" mt="-73px" spacing={1.5}>
          <Stack alignItems="center">
            <Avatar
              src={user.avatar?.url || ''}
              alt={user.fullName}
              sx={{
                width: 100,
                height: 100,
                border: '5px solid',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {!user.avatar && user.fullName?.[0]}
            </Avatar>

            <Typography variant="h6" fontWeight={700}>
              {user.fullName || '---'}
            </Typography>
            <Typography color="text.secondary" sx={{ opacity: 0.9 }}>
              {user.role || '---'}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.email || '---'}
            </Typography>
          </Stack>

          {user.phone && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" noWrap>
                {user.phone}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
