import { Box, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useController } from 'react-hook-form'

export function DateField({ label, control, name, ...props }) {
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

      <DatePicker
        value={parsedValue}
        onChange={(date) => {
          onChange(date ? date.toISOString() : null)
        }}
        onBlur={onBlur}
        format="DD/MM/YYYY"
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
