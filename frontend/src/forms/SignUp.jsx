import React, { useState } from "react";
import OtpModal from "@/components/modal/EnterOtpModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { userSignup, verifyOtp } from "@/services/user/authService";
import { useNavigate, Link } from "react-router";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await userSignup(data);
      toast.success("Signup successful! Please verify your OTP.");
      setUserData(data);
      setShowOtpModal(true);
    } catch (error) {
      toast.error(error.message || "Signup failed");
    }
  };

  const handleOtpSubmit = async (otp, data) => {
    try {
      await verifyOtp(otp, data);
      toast.success("Account created successfully!");
      setShowOtpModal(false);
      navigate("/login");
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-zinc-400">Join LEMOZ today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">Full Name</Label>
            <Input
              {...register("name")}
              placeholder="John Doe"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Phone</Label>
            <Input
              {...register("phone")}
              placeholder="1234567890"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Password</Label>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-zinc-800 border-zinc-700 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Confirm Password</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-zinc-200 mt-4"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-zinc-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </div>
      </motion.div>

      <OtpModal 
        isOpen={showOtpModal} 
        onClose={() => setShowOtpModal(false)} 
        handleOtpSubmit={handleOtpSubmit} 
        data={userData} 
      />
    </div>
  );
}
