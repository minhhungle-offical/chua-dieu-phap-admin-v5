import { CKEditorField } from '@/components/FormFields/CKEditor/CKEditorField'
import { DateField } from '@/components/FormFields/DateField'
import { InputField } from '@/components/FormFields/InputField'
import { NumberField } from '@/components/FormFields/NumberField'
import { TimeField } from '@/components/FormFields/TimeField'
import { StatusField } from '@/components/FormFields/statusField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// ===== Validation Schema =====
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Tiêu đề bắt buộc'),
  description: Yup.string(),
  location: Yup.string().required('Địa điểm bắt buộc'),
  startTime: Yup.string().required('Thời gian bắt đầu bắt buộc'),
  endTime: Yup.string().required('Thời gian kết thúc bắt buộc'),
  startDate: Yup.date().required('Ngày bắt đầu bắt buộc'),
  endDate: Yup.date()
    .required('Ngày kết thúc bắt buộc')
    .min(Yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu'),
  maxParticipants: Yup.number().min(1, 'Số lượng tham gia tối thiểu là 1'),
  price: Yup.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  isPublished: Yup.boolean(),
})

// ===== Field Config =====
const fieldsConfig = [
  { name: 'isPublished', label: 'Trạng thái', component: StatusField },
  { name: 'title', label: 'Tiêu đề', placeholder: 'Nhập tiêu đề', component: InputField },
  { name: 'location', label: 'Địa điểm', placeholder: 'Nhập địa điểm', component: InputField },
  { name: 'startTime', label: 'Thời gian bắt đầu', component: TimeField },
  { name: 'endTime', label: 'Thời gian kết thúc', component: TimeField },
  { name: 'startDate', label: 'Ngày bắt đầu', component: DateField },
  { name: 'endDate', label: 'Ngày kết thúc', component: DateField },
  { name: 'maxParticipants', label: 'Số lượng tham gia', component: NumberField, placeholder: '0' },
  { name: 'price', label: 'Giá tiền', component: NumberField, placeholder: '0' },
  { name: 'description', label: 'Nội dung', component: CKEditorField },
]

// ===== Add/Edit Retreat Form =====
export const AddEditRetreatForm = forwardRef(({ data, loading, onSubmit }, ref) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: data || {},
    resolver: yupResolver(validationSchema),
  })

  // Sync form when parent data changes
  useEffect(() => {
    reset(data || {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleFormSubmit = handleSubmit((formData) => onSubmit?.(formData))

  useImperativeHandle(ref, () => ({
    submit: handleFormSubmit,
    reset: (newData) => reset({ ...data, ...newData }),
  }))

  return (
    <Stack component="form" noValidate onSubmit={handleFormSubmit} spacing={2}>
      {fieldsConfig.map(({ component, name, ...rest }) => {
        const Component = component
        return <Component key={name} name={name} control={control} disabled={loading} {...rest} />
      })}
    </Stack>
  )
})
