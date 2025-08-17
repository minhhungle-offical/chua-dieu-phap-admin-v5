import { InputField } from '@/components/FormFields/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email'),
  fullName: Yup.string().required('Vui lòng nhập Họ và tên'),
  phone: Yup.string()
    .matches(/^(?:\+84|0)[0-9]{9}$/, 'Số điện thoại không hợp lệ')
    .nullable()
    .transform((val) => (val === '' ? null : val)),
})

export const AddEditAdminForm = forwardRef(({ loading, data, onSubmit }, ref) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: data || { email: '', fullName: '', phone: '' },
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formData) => onSubmit?.(formData))

  useImperativeHandle(ref, () => ({
    submit: handleFormSubmit,
    reset: (newData) => reset(newData),
  }))

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={2}>
      <InputField
        disabled={loading}
        name="fullName"
        control={control}
        label="Họ và tên"
        placeholder="Vd: Chùa Diệu Pháp"
      />
      <InputField
        disabled={loading}
        name="email"
        control={control}
        label="Email"
        placeholder="Vd: example@gmail.com"
      />
      <InputField
        disabled={loading}
        name="phone"
        control={control}
        label="Số điện thoại"
        placeholder="+84xxxxxxxxx"
      />
    </Stack>
  )
})
