import { RetreatCard } from '@/components/Common/RetreatCard'
import { Box, Stack } from '@mui/material'

export function RetreatList({ retreatList, onEdit, onRemove, onUpload }) {
  console.log('retreatList: ', retreatList)
  return (
    <Stack direction="row" sx={{ mx: -1.5 }} flexWrap="wrap">
      {Array.isArray(retreatList) &&
        retreatList.length > 0 &&
        retreatList.map((item, idx) => (
          <Box key={idx} sx={{ width: { xs: '100%', sm: 1 / 2, md: 1 / 3 }, height: 'auto' }}>
            <Box sx={{ p: 1.5, height: '100%' }}>
              <RetreatCard
                retreat={item}
                onEdit={() => onEdit?.(item)}
                onRemove={() => onRemove?.(item)}
                onUpload={() =>
                  onUpload?.({
                    id: item._id,
                    thumbnail: item.thumbnail,
                  })
                }
              />
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
