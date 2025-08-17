import { UploadField } from '@/components/FormFields/UploadField'
import { Box, Button, Stack } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

export const UploadThumbnailForm = forwardRef(({ data, onSubmit }, ref) => {
  const { control, handleSubmit } = useForm(
    data || {
      thumbnail: null,
    },
  )

  const handleFormSubmit = handleSubmit(({ thumbnail }) => {
    const formDate = new FormData()
    formDate.append('thumbnail', thumbnail)
    onSubmit?.(formDate)
  })

  useImperativeHandle(ref, () => ({
    submit: handleFormSubmit,
  }))

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={2}>
      <Box>
        <UploadField control={control} name="thumbnail" />
      </Box>
    </Stack>
  )
})
