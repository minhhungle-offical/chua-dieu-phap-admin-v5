import { Box, Typography } from '@mui/material'
import { TimeField as MuiTimeField } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useController } from 'react-hook-form'

export function TimeField({ label, control, name, ...props }) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const parsedValue = value && dayjs(value).isValid() ? dayjs(value) : null

  return (
    <Box>
      {label && (
        <Typography variant="caption" fontWeight={600} color="textSecondary">
          {label}
        </Typography>
      )}

      <MuiTimeField
        value={parsedValue}
        onChange={(time) => {
          onChange(time ? time.toISOString() : null)
        }}
        onBlur={onBlur}
        format="HH:mm"
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!error,
            helperText: error?.message,
            sx: {
              '& .MuiOutlinedInput-root': {
                minHeight: '56px',
              },
            },
          },
        }}
        {...props}
      />
    </Box>
  )
}
