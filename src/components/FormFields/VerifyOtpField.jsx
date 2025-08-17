import React, { useRef } from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { useController } from 'react-hook-form'

export function VerifyOtpField({ name, control, rules, length = 6, disabled = false }) {
  const {
    field: { value = '', onChange },
    fieldState: { invalid, error },
  } = useController({ name, control, rules })

  const inputsRef = useRef([])

  const setValueAtIndex = (val, index) => {
    const chars = value.padEnd(length, '').split('')
    chars[index] = val
    onChange(chars.join('').slice(0, length))
  }

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    setValueAtIndex(val, index)
    if (val && index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) inputsRef.current[index - 1]?.focus()
      setValueAtIndex('', index > 0 && !value[index] ? index - 1 : index)
      e.preventDefault()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!paste) return
    onChange(paste.padEnd(length, ''))
    paste.split('').forEach((char, i) => {
      if (inputsRef.current[i]) inputsRef.current[i].value = char
    })
    inputsRef.current[Math.min(paste.length, length) - 1]?.focus()
    e.preventDefault()
  }

  return (
    <Stack spacing={1}>
      <Box>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          {Array.from({ length }).map((_, i) => (
            <TextField
              key={i}
              inputRef={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 },
              }}
              value={value[i] || ''}
              disabled={disabled}
              error={invalid}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              sx={{
                width: 60,
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]': { MozAppearance: 'textfield' },
              }}
            />
          ))}
        </Stack>
      </Box>
      {invalid && (
        <Typography variant="body2" color="error">
          {error?.message}
        </Typography>
      )}
    </Stack>
  )
}
