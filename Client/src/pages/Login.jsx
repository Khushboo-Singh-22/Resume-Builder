import React, { useState } from 'react'
import { Lock, Mail, User2, Loader, Eye, EyeOff } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice.js'
import API from '../configs/api'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { auth, googleProvider, facebookProvider } from '../configs/firebase.js'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state: urlState } = useParams()
  const query = new URLSearchParams(window.location.search)
  const queryState = query.get('state')
  
  // Priority: URL param > Query param > default 'login'
  const initialState = urlState || queryState || "login"
  
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  //google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log("Google user:", user)

      const firebaseToken = await user.getIdToken();

      const res = await API.post("/api/auth/firebase-login", { token: firebaseToken })
      
      dispatch(login({
        token: res.data.token,
        user: res.data.user
      }))

      localStorage.setItem("token", res.data.token);
      toast.success("Google login successful")
      navigate('/');
        
    } catch (error) {
      console.error("Google login error:", error)
      toast.error("Google login failed")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // basic validation
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required')
      }
      if (state === "register" && !formData.name) {
        throw new Error('Name is required')
      }

      const { data } = await API.post(`/api/users/${state}`, formData)
      console.log('API response', data)

      if (state === "register") {
        // For registration, show verification message instead of logging in
        if (data.requiresVerification) {
          toast.success('Registration successful! Please check your email to verify your account.')
          setState('login') // Switch to login tab
          setFormData({ name: '', email: '', password: '' })
        } else {
          // Fallback for old behavior if needed
          dispatch(login(data))
          localStorage.setItem('token', data.token)
          toast.success(data.message || 'Registration successful')
          navigate('/')
        }
      } else {
        // For login, proceed as normal
        dispatch(login(data))
        localStorage.setItem('token', data.token)
        toast.success(data.message || 'Login successful')
        navigate('/')
      }

      // clear form data
      setFormData({ name: '', email: '', password: '' })
    } catch (error) {
      console.error('Login/signup error', error)
      const message = error?.response?.data?.message || error.message
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleState = () => {
    setState(prev => prev === "login" ? "register" : "login")
    setError('')
    setFormData({ name: '', email: '', password: '' })
  }
  
// Placeholder handlers for Facebook 
const handleFacebookLogin = async () => {
  try {
    setLoading(true);
    console.log("🚀 Starting Facebook login...");

    // Safety check
    if (!facebookProvider) {
      toast.error("Facebook auth not configured");
      return;
    }

    // Open popup
    const result = await signInWithPopup(auth, facebookProvider);

    if (!result || !result.user) {
      throw new Error("No user data received from Facebook");
    }

    const user = result.user;
    console.log("✅ Facebook user:", user);

    // Get Firebase ID token (IMPORTANT for backend)
    const firebaseToken = await user.getIdToken();

    if (!firebaseToken) {
      throw new Error("Failed to get Firebase token");
    }

    console.log("🔐 Token received, sending to backend...");

    // Send token to backend
    const res = await API.post("/api/auth/firebase-login", {
      token: firebaseToken,
      provider: "facebook"
    });

    if (!res?.data?.token) {
      throw new Error("Invalid backend response");
    }

    // Save user in redux
    dispatch(login({
      token: res.data.token,
      user: res.data.user
    }));

    // Save token locally
    localStorage.setItem("token", res.data.token);

    toast.success("Facebook login successful 🎉");
    navigate("/");

  } catch (error) {
    console.error("❌ Facebook Login Error:", error);

    // 🔥 Clean error handling
    switch (error.code) {
      case "auth/popup-closed-by-user":
        console.log("User closed popup");
        return;

      case "auth/cancelled-popup-request":
        console.log("Popup request cancelled");
        return;

      case "auth/popup-blocked":
        toast.error("Popup blocked! Allow popups in browser.");
        break;

      case "auth/operation-not-allowed":
        toast.error("Facebook login not enabled in Firebase.");
        break;

      case "auth/app-not-authorized":
        toast.error("Facebook app not authorized.");
        break;

      case "auth/invalid-api-key":
        toast.error("Invalid Firebase API key.");
        break;

      case "auth/account-exists-with-different-credential":
        toast.error("Account exists with different login method.");
        break;

      default:
        toast.error(error.message || "Facebook login failed");
    }

  } finally {
    setLoading(false);
  }
};
const handleAppleLogin = () => {
console.log("Apple Login Clicked")
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[350px] text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2 size={16} color='#6B7280' />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border-none outline-none ring-0 w-full bg-transparent text-sm"
              value={formData.name}
              onChange={handleChange}
              required={state !== "login"}
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color='#6B7280' />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 w-full bg-transparent text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative mt-4 w-full">
          <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-3 gap-2">
            <Lock size={13} color='#6B7280' />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border-none outline-none ring-0 w-full bg-transparent text-sm"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {state === "login" && (
        <div className="mt-4 text-left text-blue-500">
          <button
            className="text-sm hover:underline cursor-pointer"
            type="button"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
        </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
        >
          {loading ? (
            <>
              <Loader size={18} className="animate-spin" />
              Processing...
            </>
          ) : (
            state === "login" ? "Login" : "Sign up"
          )}
        </button>


        {/* 🔥 NEW SECTION */}
<div className="flex items-center my-5">
  <div className="flex-1 h-px bg-gray-300"></div>
  <p className="px-3 text-gray-400 text-sm">
    {state === "login" ? "Or login with" : "Or sign up with"}
  </p>
  <div className="flex-1 h-px bg-gray-300"></div>
</div>

<div className="flex justify-center gap-4">
  <button onClick={handleGoogleLogin} type="button"
    className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-300 hover:bg-gray-100">
    <FaGoogle />
  </button>

  <button onClick={handleFacebookLogin} type="button"
    className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-300 hover:bg-gray-100">
    <FaFacebookF />
  </button>

  {/* Apple login not yet implemented */}
  {/* <button onClick={handleAppleLogin} type="button"
    className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-300 hover:bg-gray-100">
    <FaApple />
  </button> */}
</div>

        <p className="text-gray-500 text-sm mt-3 mb-11">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={toggleState}
            className="text-blue-500 hover:underline ml-1 bg-none border-none cursor-pointer font-medium"
          >
            {state === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login