import SigninWithGoogle from "@/pages/sigin-with-google";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import Signin from "@/pages/auth/signin";
import Signup from "@/pages/auth/signup";
import VerifyAccount from "@/pages/auth/verify-account";
import { Route } from "react-router-dom";
import AuthLayout from "@/features/auth/components/AuthLayout";

export const academyAuthRoutes = (
  <Route path="auth" element={<AuthLayout />}>
    <Route path="sigin-with-google" element={<SigninWithGoogle />} />
    <Route path="signin" element={<Signin />} />
    <Route path="signup" element={<Signup />} />
    <Route path="verify-account" element={<VerifyAccount />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password" element={<ResetPassword />} />
  </Route>
);
