import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import API from './configs/api.js'
import { login, setLoading } from './app/features/authSlice.js'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import {Toaster} from 'react-hot-toast'
import ATS from './ATSChecker/src/pages/ATS.jsx'
import Analysis from './ATSChecker/src/pages/analysis.jsx'
import Interview from './ATSChecker/src/pages/interview.jsx'
import ForgatePassword from './pages/ForgatePassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

const App = () => {
  
  const dispatch = useDispatch();
  const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(setLoading(false));
      return;
    }
    try {
      const { data } = await API.get('/api/users/data', { headers: { Authorization: `Bearer ${token}` } });
      if (data.user) {
        dispatch(login({ token, user: data.user }));
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error.message);
      localStorage.removeItem('token');
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getUserData();
  }, [])


  return (
      <>
    <Toaster />

    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login/:state' element={<Login />} />
      <Route path='/view/:resumeId' element={<Preview />} />

      <Route path='/ats-checker' element={<ATS />} />
      <Route path='/ats-checker/analysis' element={<Analysis />} />

      <Route path='/interview-prep' element={<Interview />} />

      {/* forgot password route */}
      <Route path='/forgot-password' element={<ForgatePassword />} />

        {/* reset password route */}
      <Route path='/reset-password/:token' element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route path='/app' element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path='builder/:resumeId' element={<ResumeBuilder />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}

export default App