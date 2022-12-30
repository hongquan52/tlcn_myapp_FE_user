import { API } from '../baseUrl'

export const getAllProductType = async () => {
    try {
        const response = await API.get(`/api/v1/productType`);
        return response;
    }
    catch (error) {
        console.log(error.message)
    }
}
