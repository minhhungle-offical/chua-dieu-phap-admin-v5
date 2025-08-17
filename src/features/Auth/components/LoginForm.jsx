import { InputField } from '@/components/FormFields/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email'),
})

export function LoginForm({ loading, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = handleSubmit((data) => onSubmit?.(data))

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={2}>
      <InputField control={control} name="email" label="Email" placeholder="example@gmail.com" />
      <Button disabled={loading} size="large" type="submit" variant="contained">
        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
      </Button>
    </Stack>
  )
}
