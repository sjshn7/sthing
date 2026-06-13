import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import TestPage from './pages/TestPage'
import LoadingPage from './pages/LoadingPage'
import ResultPage from './pages/ResultPage'
import SharePage from './pages/SharePage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminResultsPage from './pages/admin/AdminResultsPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/share/:shareId" element={<SharePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/results" element={<ProtectedRoute><AdminResultsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
