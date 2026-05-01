import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../configs/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/api/auth/reset-password/${token}`, { password });
      toast.success("Password updated");
      navigate("/login");
    } catch (err) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form className="w-full max-w-[350px] p-8 bg-white rounded-2xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-medium">Reset Password</h2>

        <div className="flex items-center mt-6 border h-12 rounded-full pl-6 gap-2">
          <Lock size={16} />
          <input
            type="password"
            placeholder="New Password"
            className="w-full outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="mt-5 w-full h-11 rounded-full text-white bg-black">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;