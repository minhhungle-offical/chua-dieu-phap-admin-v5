import defaultImage from '@/assets/cover-6.webp'
import { formatDateRange, formatTime } from '@/utils/date'
import { AccessTime, AttachMoney, Event, LocationOn, People } from '@mui/icons-material'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

export function RetreatCard({ retreat, onEdit, onRemove, onUpload }) {
  if (!retreat) return null

  const {
    title,
    location,
    startDate,
    endDate,
    startTime,
    endTime,
    maxParticipants,
    price,
    isPublished,
    thumbnail,
  } = retreat

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        boxShadow: 1,
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
        <CardMedia
          component="img"
          image={thumbnail?.url || defaultImage}
          alt={title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        <Stack
          alignItems="flex-end"
          spacing={1}
          sx={{
            position: 'absolute',
            p: 2,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
          }}
        >
          <IconButton size="small" color="inherit" onClick={() => onEdit?.()}>
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" color="inherit" onClick={() => onRemove?.()}>
            <DeleteIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" color="inherit" onClick={() => onUpload?.()}>
            <CameraAltOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={700} noWrap>
            {title}
          </Typography>

          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" noWrap>
                {location}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Event fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formatDateRange(startDate, endDate)}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formatTime(startTime)} - {formatTime(endTime)}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <People fontSize="small" color="action" />
                <Typography variant="body2" fontWeight={600}>
                  {maxParticipants}
                </Typography>
              </Stack>

              {price > 0 && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AttachMoney fontSize="small" color="action" />
                  <Typography variant="body2" fontWeight={600}>
                    {price?.toLocaleString()} VND
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>

          <Box>
            <Stack>
              <Box>
                <Chip
                  label={isPublished ? 'Đã xuất bản' : 'Chưa xuất bản'}
                  color={isPublished ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
