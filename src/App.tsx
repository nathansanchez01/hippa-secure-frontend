import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute/>}>    
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
