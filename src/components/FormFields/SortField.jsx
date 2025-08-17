import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

export function SortField({
  label,
  optionList,
  hideOptionAll = false,
  defaultValue = '',
  onChange,
}) {
  const [value, setValue] = useState(defaultValue)

  function handleChange(e) {
    const value = e.target.value

    if (value === 'all') {
      onChange?.('')
      setValue('all')
      return
    }

    onChange?.(e.target.value)
    setValue(e.target.value)
  }

  return (
    <FormControl fullWidth sx={{ minWidth: 200 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {!hideOptionAll && <MenuItem value="all">Tất cả</MenuItem>}
        {optionList?.map((option, idx) => (
          <MenuItem value={option.value} key={idx}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
