import { adminAxios as axiosInstance } from "@/axios/interceptors";
import { isAxiosError } from "axios";

export const sendWarningNotification = async (data) => {
  try {
    const response = await axiosInstance.post('/admin/send-notification', {
      ...data,
      type: data.type || 'warning'
    });
    return response.data;
  } catch (error) {
    console.log('Error while sending notification:', error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to send notification');
    }
    throw new Error('Failed to send notification');
  }
};
