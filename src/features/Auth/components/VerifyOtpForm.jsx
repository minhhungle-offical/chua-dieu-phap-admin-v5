import { VerifyOtpField } from '@/components/FormFields/VerifyOtpField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
})

export function VerifyOtpForm({ loading, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = handleSubmit((data) => onSubmit?.(data))

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={2.5}>
      <VerifyOtpField control={control} name="otp" length={6} />
      <Button disabled={loading} size="large" type="submit" variant="contained">
        {loading ? 'Đang xử lý...' : 'Xác nhận'}
      </Button>
    </Stack>
  )
}
