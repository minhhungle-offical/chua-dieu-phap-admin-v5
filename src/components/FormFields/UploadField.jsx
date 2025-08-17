import { UploadIcon } from '@/assets/icon/UploadIcon'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Button, Typography, styled } from '@mui/material'
import React from 'react'
import { useController } from 'react-hook-form'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export function UploadField({
  name,
  control,
  label = 'Upload file',
  aspectRatio = '16/9',
  disabled,
}) {
  const [preview, setPreview] = React.useState('')

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (e) => {
    const file = e.target.files?.[0]

    // if (!file) {
    //   toast.error('Không tìm thấy file')
    //   return
    // }

    // if (file.size > 300_000) {
    //   toast.error('Kích thước ảnh phải nhỏ hơn 300KB')
    //   return
    // }

    const previewURL = URL.createObjectURL(file)
    setPreview(previewURL)
    onChange(file)
  }

  // Load preview từ server nếu có
  React.useEffect(() => {
    if (!preview && value?.url) {
      setPreview(value.url)
    }
  }, [value, preview])

  return (
    <Box>
      <Box mb={2}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          color={error ? 'error' : 'primary'}
          component="label"
        >
          {label}
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChange} />
        </Button>
      </Box>

      <Box
        sx={{
          width: '100%',
          aspectRatio: aspectRatio,
          border: '1px solid',
          borderColor: error ? 'error.main' : 'grey.300',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        {preview ? (
          <Box
            component="img"
            src={preview}
            alt="preview"
            disabled={disabled}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <UploadIcon
            sx={{ fontSize: 64, color: 'grey.400' }}
            fill={error ? '#D32F2F' : '#007765'}
          />
        )}
      </Box>

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, pl: '14px', display: 'block' }}>
          {error.message}
        </Typography>
      )}
    </Box>
  )
}
