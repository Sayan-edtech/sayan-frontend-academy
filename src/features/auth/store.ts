import { create } from "zustand";
import type {
  User,
  LoginRequest,
  SignupRequest,
  AuthResponse,
} from "@/types/user";
import { authService } from "./services/authService";
import { authCookies } from "@/lib/cookies";
import { Routes, UserType } from "@/constants/enums";
import { userService } from "../dashboard/profile/services";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  loadUser: () => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  signup: (userData: SignupRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  clearAuth: () => void;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  verifyAccount: ({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }) => Promise<AuthResponse>;
  resendOtp: (email: string) => Promise<AuthResponse>;
  resetPasswprd: (data: {
    new_password: string;
    confirm_password: string;
    verification_token: string;
  }) => Promise<AuthResponse>;
  // Computed
  isStudent: () => boolean;
  isAcademy: () => boolean;
}

// Initialize authentication state from cookies
const initializeAuthState = () => {
  const user = authCookies.getUser();
  return {
    user,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    isAuthenticated: Boolean(user),
  };
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Initial state
  ...initializeAuthState(),
  // Actions
  loadUser: async () => {
    const user = await userService.getCurrentUserProfile();
    set(() => ({
      user,
    }));
  },
  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),

  login: async (credentials) => {
    set(() => ({ isLoading: true }));

    try {
      const data = await authService.login(credentials);

      set(() => ({
        user: data.user_data,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      authCookies.setUser(data.user_data);
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },

  signup: async (userData) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.signup(userData);

      set(() => ({
        user: response.user_data,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      authCookies.setUser(response.user_data);

      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear state regardless of API success
      set(() => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));

      // Clear cookies
      authCookies.clearAll();

      // Redirect to login
      window.location.href = Routes.ROOT;
    }
  },

  refreshUser: async () => {
    const { accessToken } = get();
    if (!accessToken) return;

    set(() => ({ isLoading: true }));

    try {
      const user = await authService.getCurrentUser();
      set(() => ({
        user,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Update user data in cookies
      authCookies.setUser(user);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // If refresh fails, clear auth state
      get().clearAuth();
    }
  },

  refreshTokens: async () => {
    const { refreshToken } = get();
    if (!refreshToken) {
      get().clearAuth();
      return;
    }

    try {
      // const response = await authService.refreshToken(refreshToken);
      // Update tokens in cookies
      // authCookies.setTokens(response.access_token, response.refresh_token);
    } catch (error) {
      console.error("Failed to refresh tokens:", error);
      // If token refresh fails, clear auth state
      get().clearAuth();
      throw error;
    }
  },

  clearAuth: () => {
    set(() => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }));

    // Clear cookies
    authCookies.clearAll();
  },

  // Computed getters
  isStudent: () => {
    const { user } = get();
    return user?.user_type === UserType.STUDENT;
  },

  isAcademy: () => {
    const { user } = get();
    return user?.user_type === UserType.ACADEMY;
  },
  forgotPassword: async (email) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.forgotPassword(email);
      set(() => ({ isLoading: false }));
      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
  verifyAccount: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.verifyAccount(data);

      // Update auth state with verified user data and tokens
      set(() => ({
        user: response.data.data?.user_data,
        accessToken: response.data.data?.access_token,
        refreshToken: response.data.data?.refresh_token,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Store in cookies
      if (response.data.data) {
        authCookies.setUser(response.data.data?.user_data);
      }

      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
  resendOtp: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.resendOtp(data);
      set(() => ({ isLoading: false }));
      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
  resetPasswprd: async (data) => {
    set(() => ({ isLoading: true }));

    try {
      const response = await authService.resetPassword(data);
      set(() => ({ isLoading: false }));
      return response;
    } catch (error) {
      set(() => ({ isLoading: false }));
      throw error;
    }
  },
}));

// Selectors for specific state slices
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

// Individual action selectors - more stable than returning an object
export const useLogin = () => useAuthStore((state) => state.login);
export const useSignup = () => useAuthStore((state) => state.signup);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useRefreshUser = () => useAuthStore((state) => state.refreshUser);
export const useRefreshTokens = () =>
  useAuthStore((state) => state.refreshTokens);
export const useClearAuth = () => useAuthStore((state) => state.clearAuth);

export const useForgotPassword = () =>
  useAuthStore((state) => state.forgotPassword);

export const useVerifyAccount = () =>
  useAuthStore((state) => state.verifyAccount);

export const useResnedOtp = () => useAuthStore((state) => state.resendOtp);
export const useResetPassword = () =>
  useAuthStore((state) => state.resetPasswprd);

export const useLoadUser = () => useAuthStore((state) => state.loadUser);
