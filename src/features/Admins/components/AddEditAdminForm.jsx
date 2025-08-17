import { InputField } from '@/components/FormFields/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// ===== Validation schema =====
const schema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email'),
  fullName: Yup.string().required('Vui lòng nhập Họ và tên'),
  phone: Yup.string()
    .matches(/^(?:\+84|0)[0-9]{9}$/, 'Số điện thoại không hợp lệ')
    .nullable()
    .transform((val) => (val === '' ? null : val)),
})

// ===== Field config =====
const fields = [
  { name: 'fullName', label: 'Họ và tên', placeholder: 'Vd: Chùa Diệu Pháp' },
  { name: 'email', label: 'Email', placeholder: 'Vd: example@gmail.com' },
  { name: 'phone', label: 'Số điện thoại', placeholder: '+84xxxxxxxxx' },
]

export const AddEditAdminForm = forwardRef(({ loading, data, onSubmit }, ref) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: data || { email: '', fullName: '', phone: '' },
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = handleSubmit((formData) => onSubmit?.(formData))

  useImperativeHandle(ref, () => ({
    submit: handleFormSubmit,
    reset: (newData) => reset({ ...data, ...newData }), // merge data mới với data cũ
  }))

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={2}>
      {fields.map(({ name, label, placeholder }) => (
        <InputField
          key={name}
          name={name}
          control={control}
          label={label}
          placeholder={placeholder}
          disabled={loading}
        />
      ))}
    </Stack>
  )
})
