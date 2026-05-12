import { adminAxios as axiosInstance } from "@/axios/interceptors";

export const getIdProof = async (status, currentPage = 1, itemsPerPage = 6) => {
  try {
    const response = await axiosInstance.post('/admin/get-idproof', { status, currentPage, itemsPerPage })
    return response.data
  } catch (error) {
    console.log('Error while fetching idproof:', error);
    throw error;
  }
}

export const actionIdProof = async (id, owner_id, action, reason) => {
  try {
    const response = await axiosInstance.post(`/admin/idproof-action/${id}`, {
      action,
      owner_id,
      ...(action === 'rejected' && reason && { reason })
    })
    return response.data
  } catch (error) {
    console.log('Error while idproof action:', error);
    throw error;
  }
}
