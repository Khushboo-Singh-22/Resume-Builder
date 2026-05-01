import React, { useState } from "react";
import { Mail, Loader, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../configs/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ SEND OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email) throw new Error("Email is required");

      const { data } = await API.post("/api/auth/send-otp", { email });

      toast.success(data?.msg || "OTP sent");
      setStep(2);
    } catch (err) {
      const message = err?.response?.data?.msg || err.message;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      if (data.success) {
        toast.success("OTP Verified");
        setStep(3);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CHANGE PASSWORD
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { data } = await API.post("/api/auth/reset-password", {
        email,
        password,
      });

      toast.success(data?.msg || "Password changed");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={
          step === 1
            ? handleSubmit
            : step === 2
            ? handleVerifyOtp
            : handleChangePassword
        }
        className="w-full max-w-[350px] text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {step === 1
            ? "Forgot Password"
            : step === 2
            ? "Verify OTP"
            : "Reset Password"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          {step === 1
            ? "Enter your email to reset password"
            : step === 2
            ? "Enter OTP sent to your email"
            : "Enter new password"}
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* STEP 1 - EMAIL */}
        {step === 1 && (
          <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Mail size={13} color="#6B7280" />
            <input
              type="email"
              placeholder="Email id"
              className="border-none outline-none ring-0 w-full bg-transparent text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        {/* STEP 2 - OTP */}
        {step === 2 && (
          <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="text"
              placeholder="Enter OTP"
              className="border-none outline-none ring-0 w-full bg-transparent text-sm"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {/* STEP 3 - PASSWORD */}
        {step === 3 && (
          <>
            <div className="relative w-full mt-6">
              <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-3 gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="border-none outline-none ring-0 w-full bg-transparent text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="relative w-full mt-4">
              <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-3 gap-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="border-none outline-none ring-0 w-full bg-transparent text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* BUTTON */}
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
          ) : step === 1 ? (
            "Send Otp"
          ) : step === 2 ? (
            "Verify Otp"
          ) : (
            "Change Password"
          )}
        </button>

        {/* RESEND OTP */}
        {step === 2 && (
          <p
            onClick={handleSubmit}
            className="text-blue-500 text-sm mt-2 cursor-pointer"
          >
            Resend OTP
          </p>
        )}

        {/* BACK */}
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Remember your password?
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline ml-1 bg-none border-none cursor-pointer font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;