import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { registerSchema } from "../schema";
import type { RegisterForm } from "../types/auth.types";
import { registerUser } from "../api";
import { useAuthStore } from "../../../store/authStore";

import AuthInput from "../Components/AuthInput";

import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  Users,
  Globe,
  CheckCircle,
} from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export default function RegisterPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const registerRes = await registerUser(data);
      const user = registerRes.data.data.user;
      setUser(user);

      toast.success(`Welcome ${user.username}! 🎉`, {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/");
    } catch (error: unknown) {
      console.error(error);

      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof AxiosError) {
        const responseData = error.response?.data as ErrorResponse;
        errorMessage = responseData?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  const features = [
    {
      icon: Users,
      text: "Connect with skilled learners worldwide",
    },
    {
      icon: Globe,
      text: "Exchange knowledge in any field",
    },
    {
      icon: Shield,
      text: "Secure and trusted community",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* LEFT SIDE - Brand Section */}
      <div className="lg:w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-16 flex flex-col justify-between min-h-75 lg:min-h-screen relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              SkillSwap
            </span>
          </div>

          {/* Main Message - Desktop */}
          <div className="hidden lg:block mt-20">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Start your
              <br />
              learning journey
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                today
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-md">
              Join thousands of learners and teachers sharing knowledge across the globe.
            </p>
          </div>

          {/* Features - Desktop */}
          <div className="hidden lg:block mt-12 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-300">
                <feature.icon className="h-5 w-5 text-blue-400 shrink-0" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom - Desktop */}
        <div className="hidden lg:block relative z-10">
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Free forever
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-400" />
              No credit card
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Cancel anytime
            </span>
          </div>
        </div>

        {/* Mobile Message */}
        <div className="lg:hidden relative z-10">
          <h1 className="text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-2 text-slate-300">
            Join the global learning community
          </p>
        </div>

        {/* Mobile Features */}
        <div className="lg:hidden relative z-10 mt-6">
          <div className="grid grid-cols-1 gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                <feature.icon className="h-4 w-4 text-blue-400 shrink-0" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back?
                <br />
                <span className="text-slate-500 text-xl font-normal">
                  Create your account to get started
                </span>
              </h2>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <AuthInput
                label="Username"
                name="username"
                register={register}
                error={errors.username?.message}
                icon={<User className="w-4 h-4 text-slate-400" />}
                placeholder="Choose a username"
              />

              <AuthInput
                label="Email"
                type="email"
                name="email"
                register={register}
                error={errors.email?.message}
                icon={<Mail className="w-4 h-4 text-slate-400" />}
                placeholder="Enter your email"
              />

              <AuthInput
                label="Password"
                type="password"
                name="password"
                register={register}
                error={errors.password?.message}
                icon={<Lock className="w-4 h-4 text-slate-400" />}
                placeholder="Create a password"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-slate-400">
                  Secure & encrypted
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm">
              <span className="text-slate-500">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}