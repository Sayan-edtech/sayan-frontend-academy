import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/lib/react-query";
import { router } from "./routes/AppRoutes";
import { Directions } from "./constants/enums";
import { useEffect } from "react";
import { useAuth } from "./features/auth/hooks/useAuthStore";

function App() {
  const { loadUser, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated, loadUser]);

  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
      <Toaster dir={Directions.RTL} richColors position="top-center" />
    </ReactQueryProvider>
  );
}

export default App;
