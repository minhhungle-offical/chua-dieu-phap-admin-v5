'use client'

import { Box } from '@mui/material'
import { DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

export function DateTimeFilter({
  label,
  value,
  onChange,
  error,
  mode = 'date',
  bound = null, // 'start' | 'end' | null
  ...props
}) {
  const PickerComponent =
    mode === 'time' ? TimePicker : mode === 'datetime' ? DateTimePicker : DatePicker

  const parsedValue = value && dayjs(value).isValid() ? dayjs(value) : null

  const format = mode === 'time' ? 'HH:mm' : mode === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'

  const handleChange = (date) => {
    if (!date || !dayjs(date).isValid()) {
      onChange?.(null)
      return
    }

    let adjustedDate = dayjs(date)
    if (mode === 'date') {
      if (bound === 'start') adjustedDate = adjustedDate.startOf('day')
      else if (bound === 'end') adjustedDate = adjustedDate.endOf('day')
    }

    onChange?.(adjustedDate.toISOString())
  }

  return (
    <Box>
      <PickerComponent
        label={label}
        value={parsedValue}
        onChange={handleChange}
        format={format}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!error,
            helperText: error,
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
