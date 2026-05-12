import { userAxios as axiosInstance } from "@/axios/interceptors";
import { isAxiosError } from "axios";

export const updateProfile = async (ImageUrl, userData) => {
  try {
    const response = await axiosInstance.patch("/editProfile", { ImageUrl, ...userData });
    return response?.data;
  } catch (error) {
    console.error('Error while updating profile:', error);
    if (isAxiosError(error)) {
      const errorMsg = error.response?.data?.error || error.message || 'An unknown error occurred while updating profile';
      throw new Error(errorMsg);
    }
    throw new Error('An unexpected error occurred while updating profile');
  }
};

export const changePassword = async (value) => {
  try {
    const response = await axiosInstance.patch("/change-password", { value });
    return response?.data;
  } catch (error) {
    console.error('Error while changing password:', error);
    if (isAxiosError(error)) {
      const errorMsg = error.response?.data?.error || error.message || 'An unknown error occurred while changing password';
      throw new Error(errorMsg);
    }
    throw new Error('An unexpected error occurred while changing password');
  }
};

export const uploadIdProof = async (idProofUrl, userId) => {
  try {
    const response = await axiosInstance.post("/upload-idproof", { idProofUrl, userId });
    return response?.data;
  } catch (error) {
    console.error('Error while uploading ID proof:', error);
    if (isAxiosError(error)) {
      const errorMsg = error.response?.data?.error || error.message || 'An unknown error occurred while uploading ID proof';
      throw new Error(errorMsg);
    }
    throw new Error('An unexpected error occurred while uploading ID proof');
  }
}
