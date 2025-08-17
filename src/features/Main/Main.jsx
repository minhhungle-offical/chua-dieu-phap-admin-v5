import MainLayout from '@/components/Layouts/MainLayout'
import { LinearProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Admins = lazy(() => import('../Admins/pages/Admins'))
const Retreats = lazy(() => import('../Retreats/pages/Retreats'))

export default function Main() {
  return (
    <MainLayout>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route index element={<Navigate to="nhan-vien" />} />
          <Route path="nhan-vien" element={<Admins />} />
          <Route path="khoa-tu" element={<Retreats />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}
