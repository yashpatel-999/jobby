import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/Login/login'
import Home from './components/Home/home'
import NotFound from './components/NotFound/notFound'
import JobsPage from './components/Jobs/jobs'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import JobItemCardFull from './components/JobItemCardFull/JobItemCardFull'

function App() {
  const location = useLocation()

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoute><NotFound/></ProtectedRoute>}/>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobsPage/></ProtectedRoute>}/>
        <Route path="/jobs/:id" element={<ProtectedRoute><JobItemCardFull/></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}