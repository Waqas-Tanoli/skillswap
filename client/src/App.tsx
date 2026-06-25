import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/authStore";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;