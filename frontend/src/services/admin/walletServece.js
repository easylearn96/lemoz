import { adminAxios as axiosInstance } from "@/axios/interceptors";

export const getwallet = async (page, limit) => {
  try {
    const response = await axiosInstance.get(`/admin/get-wallet?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
}
