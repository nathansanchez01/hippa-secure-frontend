import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'

const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App
