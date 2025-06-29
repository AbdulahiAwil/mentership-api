import { Navigate, Route, Routes } from 'react-router'
import './App.css'

import LoginPage from './pages/authPages/LoginPage';
import RegisterPage from './pages/authPages/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';

import ProtectedRoute from './components/auth/ProtectRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import AdminPage from './pages/adminPage/adminPage';

function App() {
  
  

  return (
    <Routes>

      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      {/* TODO: Add protected route */}
      <Route path='/dashboard' element={<ProtectedRoute> <DashboardPage /> </ProtectedRoute>} />
      <Route path='/admin' element={<AdminProtectedRoute> <AdminPage /></AdminProtectedRoute>} />
      <Route path='/' element={<Navigate to='/login' replace />} />


    
    </Routes>
   
  )
}

export default App
