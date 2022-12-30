import { API } from "../baseUrl";

export const getCart = async () => {
    try {
      const response = await API.get(`/api/v1/cart/viewCart`);
      
      return response;
    } catch (error) {}
  }

export const updateCart = async (uid) => {
    try {
      const response = await API.put(`localhost:3000/api/v1/cart/${uid}`);
      
      return response;
    } catch (error) {}
}

export const deleteCart = async (productId) => {
  try {
    await API.delete(`api/v1/cart/${productId}`);
  } catch (error) {}
};