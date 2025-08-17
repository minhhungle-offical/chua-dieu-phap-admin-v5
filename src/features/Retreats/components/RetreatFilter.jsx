import { SearchBox } from '@/components/FormFields/SearchBox'
import { Box, Stack } from '@mui/material'

export function RetreatFilter({ filter, onFilterChange }) {
  const handleSearchChange = (search) => {
    onFilterChange?.({
      ...filter,
      search,
    })
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      flexWrap="wrap"
      sx={{ mx: -1 }}
    >
      <Box sx={{ width: { xs: '100%', sm: 300 } }}>
        <Box p={1}>
          <SearchBox onSearchChange={handleSearchChange} />
        </Box>
      </Box>
    </Stack>
  )
}
