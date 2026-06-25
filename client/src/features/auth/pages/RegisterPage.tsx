import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../schema";
import type { RegisterForm } from "../types/auth.types";

import { registerUser } from "../api";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

import AuthInput from "../Components/AuthInput";

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

const onSubmit = async (
  data: RegisterForm
) => {
  try {
    const registerRes =
      await registerUser(data);

    const user =
      registerRes.data.data.user;

    setUser(user);

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 shadow-lg rounded"
      >
        <h2 className="text-xl font-bold mb-4">
          Register
        </h2>

        <AuthInput
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
        />

        <AuthInput
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        <button
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          {isSubmitting
            ? "Creating account..."
            : "Register"}
        </button>
      </form>
    </div>
  );
}