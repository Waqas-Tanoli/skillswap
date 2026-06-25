import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema";
import type { LoginForm } from "../types/auth.types";
import { login } from "../api";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

import AuthInput from "../Components/AuthInput";

export default function LoginPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

 const onSubmit = async (
  data: LoginForm
) => {
  try {
    const loginRes = await login(data);

    const user =
      loginRes.data.data.user;

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
          Login
        </h2>

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
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}