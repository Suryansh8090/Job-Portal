import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import USER_API_END_POINT from "../utils/constant";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password/send-otp`, {
        phoneNumber: formData.phoneNumber,
      });
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password/reset`, {
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      toast.success(res.data.message);
      setStep(3); // Password reset successful
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {step === 1 && (
          <>
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              type="text"
              placeholder="Enter your registered phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-2 mb-4"
            />
            <Button onClick={sendOTP} className="w-full">
              Send OTP
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Label>OTP</Label>
            <Input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="mt-2 mb-4"
            />
            <Label>New Password</Label>
            <Input
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-2 mb-4"
            />
            <Button onClick={resetPassword} className="w-full">
              Reset Password
            </Button>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              Password reset successfully!
            </p>
            <a href="/login" className="text-blue-600 underline mt-2 block">
              Go back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
