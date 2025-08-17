import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { userKeys } from "@/lib/query-keys";

// Type for API error response
interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Hook for fetching current user profile
export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: userKeys.currentUser(),
    queryFn: userService.getCurrentUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 401 or 403 errors
      const status = (error as ApiError)?.response?.status;
      if (status === 401 || status === 403) return false;
      return failureCount < 2;
    },
  });
};

// Hook for fetching user profile by ID
export const useUserProfile = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: userKeys.profileById(userId),
    queryFn: () => userService.getUserProfile(userId),
    enabled: enabled && !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook that provides all user-related queries
export const useUserData = () => {
  const currentUserProfile = useCurrentUserProfile();

  return {
    // Current user query
    currentUserProfile,

    // Helper states
    isLoading: currentUserProfile.isLoading,
    isError: currentUserProfile.isError,
    error: currentUserProfile.error,
    user: currentUserProfile.data,
  };
};
