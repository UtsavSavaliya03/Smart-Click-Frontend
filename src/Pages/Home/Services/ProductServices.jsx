import AxiosService from "../../../AxiosService";
import { ProductUrls } from '../../../Urls.js';

const axiosService = new AxiosService();

export const getAllProducts = async () => {

    const products = await axiosService.get(ProductUrls.getAllProducts());
    
    if (products.data) {
        return products.data;
    } else {
        return false;
    }
}