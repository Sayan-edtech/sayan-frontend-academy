import { api } from "@/lib/axios";
import { authCookies } from "@/lib/cookies";
import type { User } from "@/types/user";

export interface UserProfile {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: User;
}

export interface UpdateUserProfileRequest {
  fname?: string;
  lname?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  avatar?: File | null;
  banner?: File | null;
}

export interface UpdateProfilePictureRequest {
  profile_picture: File;
}

export const userService = {
  // Get current user profile from /me endpoint
  async getCurrentUserProfile(): Promise<User> {
    // Get tokens for academy
    const tokens = authCookies.getTokens();

    const response = await api.get<UserProfile>("/me", {
      headers: {
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
    return response.data.data;
  },

  // Update user profile
  async updateUserProfile(data: UpdateUserProfileRequest): Promise<User> {
    // Get tokens for academy
    const tokens = authCookies.getTokens();

    // Create FormData for file uploads if needed
    const formData = new FormData();

    // Add text fields
    if (data.fname) formData.append("fname", data.fname);
    if (data.lname) formData.append("lname", data.lname);
    if (data.email) formData.append("email", data.email);
    if (data.phone_number) formData.append("phone_number", data.phone_number);
    if (data.gender) formData.append("gender", data.gender);

    // Add file fields
    if (data.avatar) formData.append("avatar", data.avatar);
    if (data.banner) formData.append("banner", data.banner);

    const response = await api.put<UserProfile>("/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
    return response.data.data;
  },

  // Legacy methods for backward compatibility
  // Get user profile by ID
  async getUserProfile(userId: string): Promise<User> {
    const tokens = authCookies.getTokens();

    const response = await api.get<UserProfile>(`/user/profile/${userId}`, {
      headers: {
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
    return response.data.data;
  },

  // Update profile picture only
  async updateProfilePicture(data: UpdateProfilePictureRequest): Promise<User> {
    const tokens = authCookies.getTokens();
    const formData = new FormData();
    formData.append("avatar", data.profile_picture);

    const response = await api.put<UserProfile>("/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
    return response.data.data;
  },

  // Delete profile picture
  async deleteProfilePicture(): Promise<User> {
    const tokens = authCookies.getTokens();

    const response = await api.delete<UserProfile>("/user/profile/picture", {
      headers: {
        "X-Academy-Access-Token": tokens.accessToken || "",
        "X-Academy-Refresh-Token": tokens.refreshToken || "",
      },
    });
    return response.data.data;
  },
};
