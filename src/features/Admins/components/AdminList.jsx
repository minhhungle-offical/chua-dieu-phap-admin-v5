import { UserCard } from '@/components/Common/UserCard'
import { Box, Stack } from '@mui/material'

export function AdminList({ adminList, onEdit, onRemove }) {
  return (
    <Stack direction="row" sx={{ mx: -1.5 }} flexWrap="wrap">
      {Array.isArray(adminList) &&
        adminList.length > 0 &&
        adminList.map((item, idx) => (
          <Box key={idx} sx={{ width: { xs: '100%', sm: 1 / 2, md: 1 / 3 } }}>
            <Box sx={{ p: 1.5 }}>
              <UserCard user={item} onEdit={onEdit} onRemove={onRemove} />
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
