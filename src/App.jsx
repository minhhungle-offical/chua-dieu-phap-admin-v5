import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Login = lazy(() => import('@/features/Auth/pages/Login'))
const Main = lazy(() => import('@/features/Main/Main'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dang-nhap" />} />
      <Route path="dang-nhap" element={<Login />} />
      <Route path="quan-ly/*" element={<Main />} />
    </Routes>
  )
}

export default App
