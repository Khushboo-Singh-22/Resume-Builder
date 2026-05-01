import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/home/Hero.jsx'
import { Features } from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'
import FQAsection from '../components/home/FQAsection.jsx'

const Home = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    console.log('Get Started clicked')
    const token = localStorage.getItem('token')
    console.log('Token:', token)
    
    if (token) {
      // User logged in - go to dashboard
      console.log('User logged in - redirecting to /app')
      navigate('/app')
    } else {
      // User not logged in - send to registration form
      console.log('User not logged in - redirecting to /login?state=register')
      navigate('/login?state=register')
    }
  }

  return (
    <div>
      <Hero handleGetStarted={handleGetStarted} />
      <Features />
      <Testimonials />
      <CallToAction handleGetStarted={handleGetStarted} />
      <FQAsection />
      <Footer />
    </div>
  )
}

export default Home