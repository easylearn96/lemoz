import { userAxios as axiosInstance } from "@/axios/interceptors";
import { isAxiosError } from "axios";

export const getWallet = async (userId, page, limit) => {
  try {
    const response = await axiosInstance.get(`/get-wallet/${userId}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.log('error while fetching wallet', error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error while fetching wallet');
    }
    throw new Error('Error while fetching wallet');
  }
}

export const withdrawMoney = async (bookingId, userId) => {
  try {
    const response = await axiosInstance.post(`/withdrawal/${bookingId}`, { userId })
    return response.data
  } catch (error) {
    console.log('error while withdrawal', error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error while withdrawal');
    }
    throw new Error('Error while withdrawal');
  }
}
