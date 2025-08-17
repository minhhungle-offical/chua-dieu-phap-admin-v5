import { Box, TextField, Typography } from '@mui/material'
import { useController } from 'react-hook-form'

export function NumberField({
  label,
  control,
  name,
  placeholder,
  onFieldChange,
  min,
  max,
  step = 1,
  ...props
}) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (e) => {
    const val = e.target.value
    const num = val === '' ? '' : Number(val)
    if (num === '' || !isNaN(num)) {
      if ((min !== undefined && num < min) || (max !== undefined && num > max)) return
      onChange(num)
      onFieldChange?.(num)
    }
  }

  return (
    <Box>
      {label && (
        <Typography variant="caption" fontWeight={600} color="textSecondary">
          {label}
        </Typography>
      )}
      <TextField
        type="number"
        size="medium"
        variant="outlined"
        fullWidth
        name={name}
        value={value ?? ''}
        onChange={handleChange}
        onBlur={onBlur}
        inputRef={ref}
        error={!!error}
        helperText={error?.message}
        placeholder={placeholder}
        inputProps={{ min, max, step }}
        {...props}
      />
    </Box>
  )
}
