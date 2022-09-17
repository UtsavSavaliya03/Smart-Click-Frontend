import AxiosService from "../../../AxiosService";
import { ProductUrls } from '../../../Urls.js';

const axiosService = new AxiosService();

export const getProduct = async (productId) => {

    const products = await axiosService.post(ProductUrls.getProduct(productId));
    
    if (products.data) {
        return products.data;
    } else {
        return false;
    }
}

export const addToCart = async (productDetails) => {

    const products = await axiosService.post(ProductUrls.addToCart(), productDetails);
    
    if (products.data) {
        return products.data;
    } else {
        return false;
    }
}