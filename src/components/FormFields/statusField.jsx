import { Box, FormControlLabel, Switch, Typography } from '@mui/material'
import { useController } from 'react-hook-form'

export function StatusField({
  label,
  control,
  name,
  color = 'success',
  disabled = false,
  onFieldChange,
  ...props
}) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: true,
  })

  const handleChange = (e) => {
    onChange(e.target.checked)
    onFieldChange?.(e)
  }

  return (
    <Box>
      {label && (
        <Typography
          variant="caption"
          fontWeight={600}
          color="textSecondary"
          mb={0.5}
          sx={{ display: 'block' }}
        >
          {label}
        </Typography>
      )}
      <FormControlLabel
        control={
          <Switch
            checked={!!value}
            onChange={handleChange}
            inputRef={ref}
            disabled={disabled}
            {...props}
            color={color}
          />
        }
        label=""
      />
      {error && (
        <Typography variant="caption" color="error" mt={0.5}>
          {error.message}
        </Typography>
      )}
    </Box>
  )
}
