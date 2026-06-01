import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import TestPage from './pages/TestPage'
import LoadingPage from './pages/LoadingPage'
import ResultPage from './pages/ResultPage'
import SharePage from './pages/SharePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/share/:shareId" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  )
}
