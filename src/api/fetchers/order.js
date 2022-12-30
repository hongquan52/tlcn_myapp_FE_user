import { API } from "../baseUrl";

export const getAllOrder = async () => {
    try {
      const response = await API.get(`/api/v1/order/historyOrder`);
      
      return response;
    } catch (error) {}
  }


