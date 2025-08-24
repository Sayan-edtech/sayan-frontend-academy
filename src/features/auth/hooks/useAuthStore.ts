import {
  useUser,
  useIsAuthenticated,
  useIsLoading,
  useLogin,
  useSignup,
  useLogout,
  useClearAuth,
  useForgotPassword,
  useVerifyAccount,
  useResnedOtp,
  useResetPassword,
  useLoadUser,
} from "@/features/auth/store";

// Main authentication hook that combines all the functionality
export function useAuth() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const login = useLogin();
  const signup = useSignup();
  const logout = useLogout();
  const clearAuth = useClearAuth();
  const forgotPassword = useForgotPassword();
  const verifyAccount = useVerifyAccount();
  const resendOtp = useResnedOtp();
  const resetPassword = useResetPassword();
  const loadUser = useLoadUser();
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    clearAuth,
    forgotPassword,
    verifyAccount,
    resendOtp,
    resetPassword,
    loadUser,
  };
}
